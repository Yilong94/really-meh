import { FC } from "react";

import CurrentPostsSection from "../../components/CurrentPostsSection";
import NewPostSection from "../../components/NewPostSection";
import OfficialStatementsSection from "../../components/OfficialStatementsSection";

const HomePage: FC = () => {
  return (
    <div className="flex-auto min-h-0 overflow-y-auto">
      <OfficialStatementsSection />
      <NewPostSection />
      <CurrentPostsSection />
    </div>
  );
};

export default HomePage;
