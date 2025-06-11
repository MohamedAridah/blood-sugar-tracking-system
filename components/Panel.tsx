type Props = {
  children: React.ReactNode;
  title?: string;
  action?: React.ReactNode;
};

const Panel = ({ children, title, action }: Props) => {
  return (
    <div className="rounded-lg shadow-sm border px-7 lg:px-10 py-5 my-7">
      {title ? (
        <div className="flex justify-between items-center border-b  pb-3 mb-5">
          <h2 className=" capitalize font-semibold">{title}</h2>
          {action}
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default Panel;
