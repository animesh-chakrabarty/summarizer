import { logo} from "../assets";

const Hero = () => {
  return (
    <header className="flex flex-col items-center justify-center w-full">
      <nav className="flex items-center justify-between w-full mt-5 mb-10">
        <img src={logo} alt="logo" className="w-[200px] object-contain" />
        <button
          type="button"
          onClick={() =>
            window.open(
              "https://github.com/animesh-chakrabarty/summarizer"
            )
          }
          className="black_btn"
        >
          Github
        </button>
      </nav>
      <h1 className="head_text">
        Summarize Articles with
        <br />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with summarizer, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
