import { EditorialOpening } from "./EditorialOpening";
import { HomeServices } from "./HomeServices";
import { HomeAbout } from "./HomeAbout";
import { HomeBlog } from "./HomeBlog";
import { HomeContact } from "./HomeContact";
import styles from "./HomeChapters.module.css";

export function EditorialHome() {
  return (
    <div className={styles.homeRoot}>
      <EditorialOpening />
      <HomeServices />
      <HomeAbout />
      <HomeBlog />
      <HomeContact />
    </div>
  );
}
