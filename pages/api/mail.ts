import { provinces } from './../../data/provinces';
import { companies } from './../../data/companies';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Email from 'email-templates';
// @ts-ignore
import sendInBlue from 'nodemailer-sendinblue-transport';
import nodemailer from 'nodemailer';
import _ from 'lodash';

type Data = {
  name: string
}

type Error = {
  error: string;
}

export default async (req: NextApiRequest, res: NextApiResponse<Data | Error>) => {
  if (req.method === "POST") {
    const client = nodemailer.createTransport(sendInBlue({
      apiKey: process.env.SENDINBLUE_KEY
    }))
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

    const companyIndex = companies.findIndex(company => company.value === req.body.companyName);

    const provinceIndex = provinces.findIndex(province => province.value === req.body.province);

    const template = await email.render('assessment/html', {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailAddress: req.body.emailAddress,
      phoneNumber: req.body.phoneNumber,
      homeProvince: provinces[provinceIndex].display,
      companyName: companies[companyIndex].display,
      lsdNumber: req.body.lsdNumber,
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

