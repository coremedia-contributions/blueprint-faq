import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import FAQItemFields from "./FAQItemFields";
import StructSubBean from "@coremedia/studio-client.cap-rest-client-impl/common/impl/StructSubBean";
import { ValueExpression, ValueExpressionFactory } from "@coremedia/studio-client.client-core";
import ComponentManager from "@jangaroo/ext-ts/ComponentManager";
import TabPanel from "@jangaroo/ext-ts/tab/Panel";
import Toolbar from "@jangaroo/ext-ts/toolbar/Toolbar";
import ToolbarSkin from "@coremedia/studio-client.ext.ui-components/skins/ToolbarSkin";
import IconButton from "@coremedia/studio-client.ext.ui-components/components/IconButton";
import DragDropTabPlugin from "@coremedia/studio-client.ext.ui-components/plugins/DragDropTabPlugin";
import UIBehaviour from "@coremedia/studio-client.ext.ui-components/util/UIBehaviour";
import FAQUtils from "../utils/FAQUtils";
import { as, bind } from "@jangaroo/runtime";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import Separator from "@jangaroo/ext-ts/toolbar/Separator";
import FAQLabels_properties from "../FAQLabels_properties";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import createComponentSelector from "@coremedia/studio-client.ext.ui-components/util/createComponentSelector";
import EventUtil from "@coremedia/studio-client.client-core/util/EventUtil";

interface FAQItemsEditorConfig extends Config<TabPanel>, Partial<Pick<FAQItemsEditor, "bindTo">> {

}

class FAQItemsEditor extends TabPanel {

  declare Config: FAQItemsEditorConfig;

  protected static readonly DELETE_BUTTON_ITEMID: string = "deleteBtn";
  protected static readonly ADD_BUTTON_ITEMID: string = "addBtn";
  protected static readonly MOVE_UP_BUTTON_ITEMID: string = "moveUpBtn";
  protected static readonly MOVE_DOWN_BUTTON_ITEMID: string = "moveDownBtn";

  bindTo: ValueExpression;

  #selectedIndexExpression: ValueExpression;

  #tabPosBeforeDrag: number;  // stores previous tab position for tab drag drop

  constructor(config: Config<FAQItemsEditor> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(FAQItemsEditor, {
      itemId: "faqItemsEditor",
      componentCls: "faq-items-editor",
      tabPosition: "left",
      tabRotation: 0,
      tabBar: {
        width: 300,
        layout: { align: "stretch" }
      },
      plain: true,
      tbar: [
        Config(Toolbar, {
          ui: ToolbarSkin.LIGHT.getSkin(),
          items: [
            Config(IconButton, {
              itemId: FAQItemsEditor.DELETE_BUTTON_ITEMID,
              iconCls: FAQLabels_properties.FAQItemsEditor_deleteItem_icon,
              tooltip: FAQLabels_properties.FAQItemsEditor_deleteItem_toolTip,
              text: FAQLabels_properties.FAQItemsEditor_deleteItem_toolTip,
              disabled: true,
              handler: bind(this$, this$.#deleteSelectedItem),
              plugins: [
                Config(BindPropertyPlugin, {
                  componentProperty: "disabled",
                  bindTo: this$.#getSelectedIndexExpression(),
                  transformer: (selectedIndex: number) => selectedIndex < 0 || selectedIndex >= this$.items?.getCount(),
                  ifUndefined: true
                })
              ]
            }),
            Config(Separator),
            Config(IconButton, {
              itemId: FAQItemsEditor.ADD_BUTTON_ITEMID,
              iconCls: FAQLabels_properties.FAQItemsEditor_addItem_icon,
              tooltip: FAQLabels_properties.FAQItemsEditor_addItem_toolTip,
              text: FAQLabels_properties.FAQItemsEditor_addItem_toolTip,
              handler: bind(this$, this$.#addItem)
            }),
            Config(Separator),
            Config(IconButton, {
              itemId: FAQItemsEditor.MOVE_UP_BUTTON_ITEMID,
              iconCls: FAQLabels_properties.FAQItemsEditor_moveUp_icon,
              tooltip: FAQLabels_properties.FAQItemsEditor_moveUp_toolTip,
              text: FAQLabels_properties.FAQItemsEditor_moveUp_toolTip,
              disabled: true,
              handler: bind(this$, this$.#moveItemUp),
              plugins: [
                Config(BindPropertyPlugin, {
                  componentProperty: "disabled",
                  bindTo: this$.#getSelectedIndexExpression(),
                  transformer: (selectedIndex: number) => selectedIndex <= 0,
                  ifUndefined: true
                })
              ]
            }),
            Config(IconButton, {
              itemId: FAQItemsEditor.MOVE_DOWN_BUTTON_ITEMID,
              iconCls: FAQLabels_properties.FAQItemsEditor_moveDown_icon,
              tooltip: FAQLabels_properties.FAQItemsEditor_moveDown_toolTip,
              text: FAQLabels_properties.FAQItemsEditor_moveDown_toolTip,
              disabled: true,
              handler: bind(this$, this$.#moveItemDown),
              plugins: [
                Config(BindPropertyPlugin, {
                  componentProperty: "disabled",
                  bindTo: this$.#getSelectedIndexExpression(),
                  transformer: (selectedIndex: number) => selectedIndex >= this$.items?.getCount() - 1,
                  ifUndefined: true
                })
              ]
            })
          ]
        })
      ],
      items: [],
      plugins: [
        Config(DragDropTabPlugin, {
          rearrangeDDGroup: "faqItemTabSortDD",
          activateOnHoverDDGroups: UIBehaviour.ACTIVATE_ON_HOVER_DD_GROUPS,
          activateOnHoverDelay: UIBehaviour.ACTIVATE_ON_HOVER_DELAY,
          addTabFunction: bind(this$, this$.#handleTabDrop),
          removeTabFunction: bind(this$, this$.#handleTabDrag)
        })
      ]
    }), config));
  }

  protected override afterRender() {
    super.afterRender();
    this.#renderItems();

    // Add listener on the bound content to re-render items
    this.bindTo.addChangeListener(bind(this, () => {
      this.#renderItems();
    }));

    this.mon(this, "tabchange", (tabPanel, oldCard, newCard) => {
      let selectedIndex = this.#getActiveTabIndex();
      this.#getSelectedIndexExpression().setValue(selectedIndex);
    });
  }

  #handleStructChange() {
    const activateTabAtIndex = this.#getActiveTabIndex();
    this.#renderItems(activateTabAtIndex);
  }

  #renderItems(activateTabAtIndex = -1) {
    this.removeAll();

    // Load struct items and init editor
    FAQUtils.loadFAQItems(this.bindTo.getValue()).then((items: StructSubBean[]) => {
      this.removeAll();

      if (items && items.length > 0) {
        // add items
        items.forEach((itemStruct: StructSubBean) => {
          const itemCfg = Config(FAQItemFields);
          itemCfg.bindTo = ValueExpressionFactory.createFromValue(itemStruct);
          const editor: any = ComponentManager.create(itemCfg);
          this.add(editor);
        });

        // activate first tab
        if (activateTabAtIndex > -1) {
          this.setActiveTab(activateTabAtIndex);
        }

        setTimeout(() => {
          // trigger layout update after timeout to prevent layout glitches
          this.updateLayout();
        }, 1000);
      }
    });
  }

  #addItem() {
    const activateTabAtIndex = this.#getActiveTabIndex() + 1;
    FAQUtils.addFAQItem(this.bindTo.getValue(), activateTabAtIndex).then(() => {
      this.#renderItems(activateTabAtIndex);

      // focus question field
      EventUtil.invokeLater(() => as(this.getActiveTab(), Panel)?.down(createComponentSelector().itemId("richTextArea").build())?.focus());
    });
  }

  #deleteSelectedItem() {
    FAQUtils.deleteFAQItemAtPosition(this.bindTo.getValue(), this.#getSelectedIndexExpression().getValue())
            .then(() => {
              let activateTabAtIndex = this.#getActiveTabIndex() - 1;
              if (activateTabAtIndex < 0) {
                activateTabAtIndex = 0;
              }
              this.#renderItems(activateTabAtIndex);
            })
            .catch(() => {}); // ignore
  }

  #moveItemUp() {
    const selectedIndex = this.#getSelectedIndexExpression().getValue();
    FAQUtils.moveItemToPosition(this.bindTo.getValue(), selectedIndex, selectedIndex - 1)
            .then(() => {
              this.#renderItems(selectedIndex - 1);
            })
            .catch(() => {}); // ignore
  }

  #moveItemDown() {
    const selectedIndex = this.#getSelectedIndexExpression().getValue();
    FAQUtils.moveItemToPosition(this.bindTo.getValue(), selectedIndex, selectedIndex + 1)
            .then(() => {
              this.#renderItems(selectedIndex + 1);
            })
            .catch(() => {}); // ignore
  }

  #getActiveTabIndex(): number {
    const activeTab = this.getActiveTab();
    return this.items.indexOf(activeTab);
  }

  #getSelectedIndexExpression(): ValueExpression {
    if (!this.#selectedIndexExpression) {
      this.#selectedIndexExpression = ValueExpressionFactory.createFromValue(undefined);
    }
    return this.#selectedIndexExpression;
  }

  #handleTabDrag(draggedTab: any) {
    this.#tabPosBeforeDrag = this.items.indexOf(draggedTab);
    this.remove(draggedTab, false);
  }

  #handleTabDrop(insertPosition: number, draggedTab: any) {
    this.insert(insertPosition, draggedTab);
    if (this.#tabPosBeforeDrag >= 0) {
      FAQUtils.moveItemToPosition(this.bindTo.getValue(), this.#tabPosBeforeDrag, insertPosition)
              .then(() => this.#renderItems())
              .catch((e) => console.log(e));
      this.#tabPosBeforeDrag = null;
    }
  }

}

export default FAQItemsEditor;
