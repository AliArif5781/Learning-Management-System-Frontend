import { Button } from "@/components/ui/button";
import img from "/imagee.webp";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen grid grid-cols-12 px-6 md:px-16">
      {/* Left content */}
      <div className="col-span-12 md:col-span-6 flex items-center">
        <div className="max-w-xl -translate-y-12">
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
            Development Learning Platform
          </h1>

          <p className="mt-6 text-lg lg:text-xl dark:text-gray-400 text-neutral-600">
            A place to read, learn, and deepen your understanding.
          </p>

          <div className="mt-7 cursor-pointer">
            <Button
              asChild
              variant={"default"}
              // className="text-foreground"
              size={"lg"}
            >
              <Link to={"/courses"}> Start Learning</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="hidden md:block col-span-6">
        {/* Make the column a flex box that fills height and pushes content to bottom-right */}
        <div className="h-full flex items-center justify-end">
          {/* Image card */}
          <div>
            <img
              src={img}
              alt="Learning & development"
              className="h-full w-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
