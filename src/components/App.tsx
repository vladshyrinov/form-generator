import formInstructions from 'data/form_instructions.json';
import FormProvider from 'providers/FormProvider';
import Form from './Form';

const job = formInstructions as Frontier.Job;
const { theme } = job;

function App() {
  return (
    <FormProvider>
      <Form />
    </FormProvider>
  );
}

export default App;
