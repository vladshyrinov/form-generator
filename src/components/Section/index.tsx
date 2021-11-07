import { FC, useMemo } from 'react';

import TextArea from 'components/Form/TextArea';
import Select from 'components/Form/Select';
import Input from 'components/Form/Input';

interface SectionProps {
  section: Frontier.Section;
}

const getSectionElement = (element: Frontier.Element) => {
  switch (element.type) {
    case 'boolean':
    case 'text':
      return <Input element={element} />;
    case 'textarea':
      return <TextArea element={element} />;
    case 'multichoice':
      return <Select element={element} />;
    default:
      throw new Error('Specified element type is not supported');
  }
};

const Section: FC<SectionProps> = ({ section }) => {
  const { title, content } = section;

  const sectionElements = useMemo(
    () =>
      content.map((element: Frontier.Element) => (
        <div key={element.id}>{getSectionElement(element)}</div>
      )),
    [content],
  );

  return (
    <>
      <h3>{title}</h3>
      <section>{sectionElements}</section>
    </>
  );
};

export default Section;
