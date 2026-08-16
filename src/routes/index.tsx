import { createFileRoute } from "@tanstack/react-router";
import MainContent from "~/components/MainContent";

export const Route = createFileRoute('/')({
  component: PortfolioRoute,
});

function PortfolioRoute() {
  return <MainContent />;
}
