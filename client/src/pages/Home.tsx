const Home = () => {
  return (
    <>
      <section>
        <h1 className="text-4xl my-5">Welcome to the Production Dashboard!</h1>
        <h2 className="text-2xl m-1">Project Purpose</h2>
        <p>
          The Production Dashboard is a modern web application designed for
          real-time visualization and analysis of production data. Our goal is
          to provide an intuitive and responsive tool that enables monitoring of
          key performance indicators (KPIs), managing production processes, and
          supporting business decisions through clear and interactive
          charts.Tailored for users in the manufacturing industry, the
          application offers easy access to data, flexible presentation options,
          and high performance.
        </p>
        <h2 className="text-2xl m-1">Technologies</h2>
        <div>
          The Production Dashboard is built using a modern technology stack,
          ensuring speed, scalability, and maintainability:<br></br>
          <strong>Frontend: </strong>
          <a>
            <ul>
              <li>
                TypeScript and React – for a secure, component-based, and
                dynamic user interface.
              </li>
              <li>
                Vite – an ultra-fast build and development tool, providing
                instant application refreshes.{" "}
              </li>
              <li>
                Recharts – a library for creating interactive and visually
                appealing charts to visualize production data.
              </li>
            </ul>
          </a>
          <strong>Backend: </strong>
          <a>
            <ul>
              <li>
                FastAPI – a modern Python framework delivering high performance,
                automatic API documentation, and seamless integration with the
                frontend.
              </li>
            </ul>
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
