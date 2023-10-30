import PropTypes from 'prop-types';
import AccordionSingle from './AccordionSingle';

const Accordion = ({ data }) => {
  return (
    <div className="border border-gray-300 divide-y rounded-xl">
      {data?.map((item, index) => (
        <AccordionSingle
          key={`accordion-${index}`}
          title={item?.title}
          iconPrepend={item?.iconPrepend}
          isToggle={item?.isToggle}
          classNameIconAppend="text-gray-400"
        >
          {item?.children}
        </AccordionSingle>
      ))}
    </div>
  );
};

Accordion.propTypes = {
  data: PropTypes.array,
};

export default Accordion;
