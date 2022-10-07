export enum ListStyle {
  text = "Text",
  heading1 = "Heading 1",
  heading2 = "Heading 2",
  heading3 = "Heading 3",
  item = "Bulleted list",
}

export type OnClick = (selectedStyle: ListStyle) => void;

export function menuItems(element: HTMLDivElement, handleClick: OnClick) {
  const listItems: ItemProp[] = [
    {
      type: ListStyle.text,
      imgSrc: "public/images/text.png",
      content: "Just start writing with plain text.",
      onclick: () => handleClick(ListStyle.text),
    },
    {
      type: ListStyle.heading1,
      imgSrc: "public/images/h1.png",
      content: "Big section heading.",
      onclick: () => handleClick(ListStyle.heading1),
    },
    {
      type: ListStyle.heading2,
      imgSrc: "public/images/h2.png",
      content: "Medium section heading.",
      onclick: () => handleClick(ListStyle.heading2),
    },
    {
      type: ListStyle.heading3,
      imgSrc: "public/images/h3.png",
      content: "Small section heading.",
      onclick: () => handleClick(ListStyle.heading3),
    },
    {
      type: ListStyle.item,
      imgSrc: "public/images/item.png",
      content: "Create a simple bulleted list.",
      onclick: () => handleClick(ListStyle.item),
    },
  ];
  const container = document.createElement("div");
  container.setAttribute("class", "menu_list");
  const header = document.createElement("div");
  header.setAttribute("class", "header");
  header.innerText = "basic blocks";
  container.appendChild(header);
  listItems.map(listItem => {
    container.appendChild(item(listItem))
  })
  element.appendChild(container);
}

interface ItemProp {
  type: ListStyle;
  imgSrc: string;
  content: string;
  onclick: () => void;
}

function item(props: ItemProp) {
  const { type, imgSrc, content, onclick } = props;
  const container = document.createElement("div");
  container.setAttribute("class", "notion-focusable");
  const flexContainer = document.createElement("div");
  flexContainer.setAttribute(
    "style",
    "display: flex; align-items: center; line-height: 120%; width: 100%; user-select: none; min-height: 45px; font-size: 14px; padding-top: 4px; padding-bottom: 4px;",
  );
  // Left Container
  const leftContainer = document.createElement("div");
  leftContainer.setAttribute(
    "style",
    "display: flex; align-items: center; justify-content: center; margin-left: 10px; margin-right: 4px; margin-top: 1px; align-self: flex-start;",
  );
  const imageContainer = document.createElement("div");
  imageContainer.setAttribute("style", "width: 100%; height: 100%");
  const imageElement = document.createElement("img");
  imageElement.setAttribute("src", imgSrc);
  imageElement.setAttribute(
    "style",
    "display: block; object-fit: cover; border-radius: 3px; background: white; width: 46px; height: 46px; flex-grow: 0; flex-shrink: 0; box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px;",
  );
  imageContainer.appendChild(imageElement);
  leftContainer.appendChild(imageContainer);
  // Right Container
  const rightContainer = document.createElement("div");
  rightContainer.setAttribute("style", "margin-left: 6px; margin-right: 12px; min-width: 0px; flex: 1 1 auto;");
  const header = document.createElement("div");
  header.setAttribute("style", "white-space: nowrap; overflow: hidden; text-overflow: ellipsis;");
  header.innerText = type;
  const text = document.createElement("div");
  text.setAttribute(
    "style",
    "white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: rgba(55, 53, 47, 0.65); margin-top: 2px; font-size: 12px;",
  );
  text.innerText = content;
  rightContainer.appendChild(header);
  rightContainer.appendChild(text);
  flexContainer.appendChild(leftContainer);
  flexContainer.appendChild(rightContainer);
  container.appendChild(flexContainer);
  container.onclick = onclick;
  return container;
}
