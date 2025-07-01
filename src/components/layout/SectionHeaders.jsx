export default function SectionHeaders({ subHeader, mainHeader, isDark }) {
  return (
    <>
      <h3 className="uppercase text-gray-500 font-semibold leading-4 font-lemon">
        {subHeader}
      </h3>
      <h2 className={`text-${isDark ? 'white': 'black'} font-bold text-lg`}> {mainHeader}</h2>
    </>
  );
}
