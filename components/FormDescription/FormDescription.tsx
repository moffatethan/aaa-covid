import { Container } from '../Container';

export const FormDescription = () => {
  return (
    <Container>
      <ul className="list-disc font-bold text-gray-500 font-body leading-loose">
        <li>Cough</li>
        <li>Unexplained Muscle or Joint aches</li>
        <li>Unexplained loss of appetite, smell or taste</li>
        <li>Nausea</li>
        <li>Fever ({`>`} 38C&deg; or 100.4F&deg;)</li>
        <li>Shortness of Breath</li>
      </ul>
    </Container>
  );
};
