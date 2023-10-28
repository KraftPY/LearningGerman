import styles from "./header.module.scss";
import Lang from "../lang_panel/lang";

export default function Header() {
  return (
    <header>
      <div className="flex flex-row h-16 justify-between px-16">
        <div>
          <h4 className="py-6 text-2xl">Header</h4>
        </div>
        <div className="order-last">
          <Lang />
        </div>
      </div>
    </header>
  );
}
