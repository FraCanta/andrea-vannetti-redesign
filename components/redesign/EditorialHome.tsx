import { EditorialOpening } from "./EditorialOpening";
import { HomeServices } from "./HomeServices";
import { HomeBridgeMarquee } from "./HomeBridgeMarquee";
import { HomeAbout } from "./HomeAbout";
import { HomeBlog } from "./HomeBlog";
import { HomeContact } from "./HomeContact";
import styles from "./HomeChapters.module.css";

export function EditorialHome() {
  return (
    <main className={styles.homeRoot}>
      <EditorialOpening />
      <HomeServices />
      <HomeBridgeMarquee />
      <HomeAbout />
      <HomeBlog />
      <HomeContact />
    </main>
  );
}
