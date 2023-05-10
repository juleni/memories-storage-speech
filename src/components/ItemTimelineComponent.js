import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { ReactComponent as NationalIcon } from "../national.svg";
import { ReactComponent as PersonalIcon } from "../personal.svg";
import { ReactComponent as WorldIcon } from "../world.svg";
import "./ItemTimelineComponent.css";

export default function ItemTimelineComponent({ itemList }) {
  function getIconStyleByType(itemType) {
    let iconBgColor = "transparent";
    switch ("" + itemType) {
      case "0":
        iconBgColor = "cornflowerblue";
        break;
      case "1":
        iconBgColor = "gold";
        break;
      case "2":
        iconBgColor = "coral";
        break;
      default:
    }
    return { background: iconBgColor };
  }

  function getIconByType(itemType) {
    switch ("" + itemType) {
      case "0":
        return <PersonalIcon />;
      case "1":
        return <NationalIcon />;
      case "2":
        return <WorldIcon />;
      default:
        return <WorldIcon />;
    }
  }

  return (
    <div className="container-tl">
      <h1 className="title">Memories Timeline</h1>

      <VerticalTimeline>
        {itemList.map((element) => {
          console.log(element);
          return (
            <VerticalTimelineElement
              key={"tl-" + element.id}
              date={element.date}
              dateClassName="date"
              iconStyle={getIconStyleByType(element.type)}
              icon={getIconByType(element.type)}
            >
              <h3 className="vertical-timeline-element-title">
                {element.title}
              </h3>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
}
