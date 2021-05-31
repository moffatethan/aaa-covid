// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Email from 'email-templates';
import path from 'path';
import nodemailer from 'nodemailer';
// @ts-ignore
import sgTransport from 'nodemailer-sendgrid-transport';
import _ from 'lodash';

type Data = {
  name: string
}

type Error = {
  error: string;
}

const options = {
  auth: {
    api_user: process.env.SENDGRID_USER,
    api_key: process.env.SENDGRID_KEY
  }
}

export default async (req: NextApiRequest, res: NextApiResponse<Data | Error>) => {
  console.log(options);
  if (req.method === "POST") {
    const client = nodemailer.createTransport(sgTransport(options))
    const email = new Email({
      message: {
        from: 'no-reply@moffatcore.ca',
      },
      transport: {
        jsonTransport: true
      }
    });

    const answerNoToAll = _.pickBy(req.body, (property) => property === 'yes')

    const allAnswers = _.pickBy(req.body, (property) => property === 'yes' || property === 'no')

    const template = await email.render('assessment/html.pug', {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailAddress: req.body.emailAddress,
      phoneNumber: req.body.phoneNumber,
      answerNoToAll: Object.keys(answerNoToAll).length === 0,
      answerNoToAllKeys: Object.keys(answerNoToAll),
      answerNoQuestions: answerNoToAll,
      allAnswersKeys: Object.keys(allAnswers),
      allAnswers,
      questions: {
        travelledOutside: 'Travelled outside Canada within the last 14 days',
        closeContactTravelOutside: 'Has been in close contact with someone who travelled outside of Canada within the last 14 days',
        closeContactWithCovid: 'Has been in close contact with someone with or suspected to have COVID-19',
        outsideGroup: 'Has been in close contact with a group 10 or more outside of their immediate family within the last 14 days',
        isTested: 'Has been tested and awaiting on results',
        symptons: 'Has symptons related to COVID-19'
      }
    });

    try {
      const response = await client.sendMail({
        from: 'no-reply@moffatcore.ca',
        to: req.body.emailAddress,
        subject: `${req.body.firstName} ${req.body.lastName} - COVID-19 Assessment`,
        html: template,
        text: template.toString()
      });

      // @ts-ignore
      return res.status(200).json(response);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Unable to send email.' });
    }
  }
  return res.status(400).json({ error: 'Only POST methods allowed.' });
}

