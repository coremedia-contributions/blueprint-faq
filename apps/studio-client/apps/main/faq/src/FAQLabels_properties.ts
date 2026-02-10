import { add, moveDown, moveUp, remove, typeObject } from "@coremedia/studio-client.common-icons";
import { SvgIconUtil } from "@coremedia/studio-client.base-models";

interface FAQLabels_properties {
  FAQItemsPropertyField_title: string;

  FAQItemsEditor_deleteItem_text: string;
  FAQItemsEditor_deleteItem_toolTip: string;
  FAQItemsEditor_deleteItem_icon: string;

  FAQItemsEditor_addItem_text: string;
  FAQItemsEditor_addItem_toolTip: string;
  FAQItemsEditor_addItem_icon: string;

  FAQItemsEditor_moveUp_text: string;
  FAQItemsEditor_moveUp_toolTip: string;
  FAQItemsEditor_moveUp_icon: string;

  FAQItemsEditor_moveDown_text: string;
  FAQItemsEditor_moveDown_toolTip: string;
  FAQItemsEditor_moveDown_icon: string;

  FAQItemFields_question_fieldLabel: string;
  FAQItemFields_answer_fieldLabel: string;
}

const FAQLabels_properties: FAQLabels_properties = {
  FAQItemsPropertyField_title: "Questions & Answers",

  FAQItemsEditor_deleteItem_text: "Delete Item",
  FAQItemsEditor_deleteItem_toolTip: "Delete Item",
  FAQItemsEditor_deleteItem_icon: SvgIconUtil.getIconStyleClassForSvgIcon(remove),

  FAQItemsEditor_addItem_text: "Add Item",
  FAQItemsEditor_addItem_toolTip: "Add Item",
  FAQItemsEditor_addItem_icon: SvgIconUtil.getIconStyleClassForSvgIcon(add),

  FAQItemsEditor_moveUp_text: "Move Up",
  FAQItemsEditor_moveUp_toolTip: "Move Up",
  FAQItemsEditor_moveUp_icon: SvgIconUtil.getIconStyleClassForSvgIcon(moveUp),

  FAQItemsEditor_moveDown_text: "Move Down",
  FAQItemsEditor_moveDown_toolTip: "Move Down",
  FAQItemsEditor_moveDown_icon: SvgIconUtil.getIconStyleClassForSvgIcon(moveDown),

  FAQItemFields_question_fieldLabel: "Question",
  FAQItemFields_answer_fieldLabel: "Answer",
}

export default FAQLabels_properties;
