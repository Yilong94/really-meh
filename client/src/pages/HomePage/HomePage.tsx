import { FC } from "react";

import CurrentPostsSection from "../../components/CurrentPostsSection";
import NewPostSection from "../../components/NewPostSection";
import OfficialStatementsSection from "../../components/OfficialStatementsSection";

const HomePage: FC = () => {
  return (
    <div className="flex-auto overflow-y-auto m-h-0">
      <OfficialStatementsSection />
      <NewPostSection />
      <CurrentPostsSection />
    </div>
  );
};

export default HomePage;
