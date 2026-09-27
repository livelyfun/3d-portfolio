import type { ProjectArtKey } from "@/data/projects";
import { StockMatrixArt } from "./stockmatrix";
import { KiraArt } from "./kira";
import { ReelStudioArt } from "./reelstudio";
import { YtDownloaderArt } from "./yt-downloader";
import { OrganizerArt } from "./organizer";
import { MpmServicesArt } from "./mpmservices";

const registry: Record<ProjectArtKey, () => React.JSX.Element> = {
  stockmatrix: StockMatrixArt,
  kira: KiraArt,
  reelstudio: ReelStudioArt,
  "yt-downloader": YtDownloaderArt,
  organizer: OrganizerArt,
  mpmservices: MpmServicesArt,
};

export function ProjectArt({ art }: { art: ProjectArtKey }) {
  const Component = registry[art];
  return <Component />;
}
