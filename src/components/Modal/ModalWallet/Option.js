import Button from 'components/Button/Button';

export default function Option({
  link = null,
  // clickable = true,
  // size,
  onClick = null,
  color,
  header,
  subheader = null,
  icon,
  active = false,
  // id,
}) {
  const content = (
    <Button onClick={onClick} className="flex items-center justify-between w-full mx-auto text-white">
      <div>
        <div className="flex items-center">
          {active && <div className="w-4 h-4 mr-4 rounded-full" style={{ background: color }} />}
          {header}
        </div>
        {subheader && <div>{subheader}</div>}
      </div>
      <img src={icon} alt={'Icon'} className="w-8 h-8" />
    </Button>
  );
  if (link) {
    return <a href={link}>{content}</a>;
  }

  return !active ? content : <div className="w-full p-px rounded">{content}</div>;
}
