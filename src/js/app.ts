import { menuItems, ListStyle } from "./menuItems";
import { randomBytes } from "crypto";

function main() {
  const title = document.getElementsByClassName("title-input");
  title[0]?.addEventListener("mouseover", showTitleOptions);

  const initDiv = document.getElementById("initial");
  if (!initDiv) return;
  const childBlock = createChildBlock();
  initDiv?.appendChild(childBlock);

  childBlock.addEventListener("mouseover", () => {
    // console.log(childBlock.children.length);
    const dragIcon = document.createElement("img");
    if (childBlock.children.length > 2) return;
    dragIcon.setAttribute("class", "drag-icon");
    dragIcon.setAttribute("src", "/public/images/drag.png");
    dragIcon.setAttribute("draggable", "true");
    childBlock.appendChild(dragIcon);
    childBlock.addEventListener("mouseleave", () => {
      childBlock.removeChild(dragIcon);
    });
  });

  initDiv?.addEventListener("keydown", (e: Event) => {
    if ((e as KeyboardEvent).key === "Enter") {
      const childBlock = createChildBlock();
      initDiv.appendChild(childBlock);

      childBlock.addEventListener("mouseover", () => {
        // console.log(childBlock.children.length);
        const dragIcon = document.createElement("img");
        if (childBlock.children.length > 2) return;
        dragIcon.setAttribute("class", "drag-icon");
        dragIcon.setAttribute("src", "/public/images/drag.png");
        dragIcon.setAttribute("draggable", "true");
        childBlock.appendChild(dragIcon);
        childBlock.addEventListener("mouseleave", () => {
          childBlock.removeChild(dragIcon);
        });
      });

      const blockInputEl = childBlock.children[0] as HTMLElement;
      blockInputEl.focus();
      const targets = findChildBlock(initDiv);
      initDiv.ondrop = dropping(initDiv, targets);
      e.preventDefault();
    }
    // 아래 방향키
    if ((e as KeyboardEvent).key === "ArrowDown") {
      // 1. childBlock들의 id로 배열 만들어
      const blockIdArr = new Array(childBlock.getAttribute("id"));
      // 2. 그 배열에서, 현재 포커스의 id의 인덱스값 확인 후
      const currentId = document.activeElement?.getAttribute("id");
      // const currentIndex = blockIdArr.indexOf(currentId);
      // 3. +1인덱스 요소로 포커스 이동
      // currentIndex+1.focus();
      console.log("ARROW DOWN!", blockIdArr, currentId);
    }
    // 위 방향키: 현재 포커스의 id의 인덱스보다 -1인덱스 요소로 포커스 이동
    if ((e as KeyboardEvent).key === "ArrowUp") {
      console.log("ARROW UP!");
    }
  });
  const targets = findChildBlock(initDiv);
  initDiv.ondrop = dropping(initDiv, targets);
}

function showTitleOptions() {
  const titleOptionBlock = document.getElementsByClassName("title-optionBlock");
  // console.log("TITLE HOVER!", titleOptionBlock[0].children.length);
  if (titleOptionBlock[0].children.length > 0) return;
  const addIconButton = document.createElement("div");
  addIconButton.setAttribute("class", "title-option");
  addIconButton.innerText = "Add icon";
  const addCoverButton = document.createElement("div");
  addCoverButton.setAttribute("class", "title-option");
  addCoverButton.innerText = "Add cover";
  const addCommentButton = document.createElement("div");
  addCommentButton.setAttribute("class", "title-option");
  addCommentButton.innerText = "Add comment";
  titleOptionBlock[0].appendChild(addIconButton);
  titleOptionBlock[0].appendChild(addCoverButton);
  titleOptionBlock[0].appendChild(addCommentButton);
  const title = document.getElementsByClassName("title");
  title[0]?.addEventListener("mouseleave", () => {
    titleOptionBlock[0].removeChild(addIconButton);
    titleOptionBlock[0].removeChild(addCoverButton);
    titleOptionBlock[0].removeChild(addCommentButton);
  });
}

function createChildBlock() {
  const childBlock = document.createElement("div");
  const blockId = randomBytes(8).toString("hex");
  childBlock.setAttribute("id", blockId);
  // childBlock.setAttribute("draggable", "true");

  const menuContainer = document.createElement("div");

  const textContainer = document.createElement("div");
  textContainer.setAttribute("placeholder", "Type '/' for commands");
  textContainer.setAttribute("contenteditable", "true");
  textContainer.setAttribute("class", "block-input");
  textContainer.setAttribute("id", blockId);
  textContainer.setAttribute("draggable", "false");

  const menu = document.createElement("div");
  menu.setAttribute("class", "menu");

  const handleClick = (selectedStyle: ListStyle) => {
    switch (selectedStyle) {
      case ListStyle.heading1: {
        textContainer.removeAttribute("class");
        textContainer.classList.add("block-input", "heading1");
        textContainer.setAttribute("placeholder", "Heading 1");
        break;
      }
      case ListStyle.heading2: {
        textContainer.removeAttribute("class");
        textContainer.classList.add("block-input", "heading2");
        textContainer.setAttribute("placeholder", "Heading 2");
        break;
      }
      case ListStyle.heading3: {
        textContainer.removeAttribute("class");
        textContainer.classList.add("block-input", "heading3");
        textContainer.setAttribute("placeholder", "Heading 3");
        break;
      }
      case ListStyle.text: {
        textContainer.removeAttribute("class");
        textContainer.classList.add("block-input", "text");
        textContainer.setAttribute("placeholder", "");

        break;
      }
      case ListStyle.item: {
        textContainer.removeAttribute("class");
        textContainer.classList.add("block-input", "item");
        textContainer.setAttribute("placeholder", "List");
        break;
      }
    }
    //menu안뜨게
    const innerMenuEl = menuContainer.getElementsByClassName("menu");
    if (!innerMenuEl) return;
    if (innerMenuEl.length === 0) return;
    menuContainer.removeChild(menu);
  };

  menuItems(menu, handleClick);
  childBlock.addEventListener("keydown", (e: Event) => {
    if ((e as KeyboardEvent).key === "/") {
      menuContainer.appendChild(menu); //menu뜨게
    } else {
      //menu안뜨게
      const innerMenuEl = menuContainer.getElementsByClassName("menu");
      if (innerMenuEl.length === 0) return;
      menuContainer.removeChild(menu);
    }
  });
  childBlock.appendChild(textContainer);
  childBlock.appendChild(menuContainer);

  return childBlock;
}

function findChildBlock(initDiv: HTMLElement) {
  let targets = new Array<DragTarget>();
  for (let i = 0; i < initDiv.children.length; i++) {
    const targetElement = initDiv.children[i] as HTMLElement;
    targetElement.ondragstart = handleStartDraggingEvent;
    targetElement.ondragover = handleDraggingOverEvent;
    targetElement.ondragenter = handleDraggingEnterEvent;
    targets.push({ id: targetElement.id, element: targetElement, index: i });
    console.log(targetElement);
  }
  return targets;
}

function handleStartDraggingEvent(ev: DragEvent) {
  const target = ev.target as HTMLElement;
  var dataTransfer = ev.dataTransfer;
  if (!dataTransfer) return;
  dataTransfer.setData("text/plain", target.parentElement?.id!);
}
function handleDraggingEnterEvent(ev: DragEvent) {
  const target = ev.target as HTMLElement; //target: drag중인 요소
  if (target.parentElement?.id! === ev.dataTransfer!.getData("text/plain")) {
    //dataTransfer: drag중인 요소가 호버중인 대상
    return;
  }
  target.parentElement?.setAttribute("style", "border-bottom: 3px solid rgba(35, 131, 226, 0.28)");
}

function handleDraggingOverEvent(ev: DragEvent) {
  ev.preventDefault();
  const dragover = ev.target as HTMLElement;
  dragover.setAttribute("style", "border: none");
}

function dropping(initDiv: HTMLElement, targets: DragTarget[]) {
  return function handleDroppingEvent(ev: DragEvent) {
    const target = ev.target as HTMLElement;
    const dragTargetId = ev.dataTransfer!.getData("text/plain");

    const dropped = targets.find((t) => t.id === target.parentElement?.id!);
    const dragged = targets.find((t) => t.id == dragTargetId);
    if (dropped == null || dragged == null) {
      return;
    }
    const droppedIndex = dropped.index;
    dropped.index = dragged.index;
    dragged.index = droppedIndex;
    updateElements(initDiv, targets);
    ev.preventDefault();
    target.parentElement?.setAttribute("style", "border: none");
  };
}
interface DragTarget {
  id: string;
  element: HTMLElement;
  index: number;
}

function updateElements(initDiv: HTMLElement, targets: DragTarget[]) {
  for (let i = initDiv.children.length - 1; i >= 0; i--) {
    initDiv.removeChild(initDiv.children[i]);
  }
  for (const target of targets.sort((a, b) => a.index - b.index)) {
    initDiv.appendChild(target.element);
  }
}

window.addEventListener("load", main);
