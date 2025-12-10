import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import RichTextPropertyField
  from "@coremedia/studio-client.main.editor-components/sdk/premular/fields/richtext/RichTextPropertyField";
import { Markup, ValueExpression } from "@coremedia/studio-client.client-core";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import Labelable from "@jangaroo/ext-ts/form/Labelable";
import { ContentPropertyNames } from "@coremedia/studio-client.cap-rest-client";
import RichTextPlainTextTransformer
  from "@coremedia/studio-client.cap-base-models/content/RichTextPlainTextTransformer";
import AdvancedFieldContainer from "@coremedia/studio-client.ext.ui-components/components/AdvancedFieldContainer";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import AnchorLayout from "@jangaroo/ext-ts/layout/container/Anchor";
import VerticalSpacingPlugin from "@coremedia/studio-client.ext.ui-components/plugins/VerticalSpacingPlugin";
import FAQLabels_properties from "../FAQLabels_properties";

interface FAQItemFieldsConfig extends Config<Panel>, Partial<Pick<FAQItemFields,
        "bindTo"
>> {}

class FAQItemFields extends Panel {

  declare Config: FAQItemFieldsConfig;

  static readonly QUESTION_FIELD_ITEMID:string = "question";
  static readonly ANSWER_FIELD_ITEMID:string = "answer";

  bindTo: ValueExpression;

  constructor(config: Config<FAQItemFields> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(FAQItemFields, {
      title: "Item",
      bodyPadding: "10 20",
      componentCls: "faq-item-fields",
      items: [
        Config(AdvancedFieldContainer, {
          labelAlign: "top",
          labelSeparator: "",
          defaultField: ":first",
          items: [
            Config(RichTextPropertyField, {
              itemId: FAQItemFields.QUESTION_FIELD_ITEMID,
              propertyName: "question",
              fieldLabel: FAQLabels_properties.FAQItemFields_question_fieldLabel,
              bindTo: config.bindTo,
              initialHeight: 100,
              plugins: [],
            }),
            Config(RichTextPropertyField, {
              itemId: FAQItemFields.ANSWER_FIELD_ITEMID,
              propertyName: "answer",
              fieldLabel: FAQLabels_properties.FAQItemFields_answer_fieldLabel,
              bindTo: config.bindTo,
              initialHeight: 100,
              plugins: []
            })
          ],
          plugins: [Config(VerticalSpacingPlugin)],
          defaultType: Labelable["xtype"],
          defaults: Config<Labelable>({
            labelSeparator: "",
            labelAlign: "top",
          }),
          layout: Config(VBoxLayout, { align: "stretch" })
        })
      ],
      layout: Config(AnchorLayout)
    }), config));

    this$.#updateTitle();
  }

  protected override afterRender(): any {
    super.afterRender();

    this.bindTo.extendBy(ContentPropertyNames.PROPERTIES, "question").addChangeListener(() => {
      this.#updateTitle();
    });

    this.#updateTitle();
  }

  #updateTitle() {
    if (this.bindTo) {
      this.bindTo.extendBy(ContentPropertyNames.PROPERTIES, "question").loadValue((markup: Markup) => {
        let text = "Item";
        if (markup) {
          text = RichTextPlainTextTransformer.convertToPlainText(markup.asXml());
          text = text.slice(0, Math.min(text.indexOf("?") > 0 ? text.indexOf("?") + 1 : text.length, 50));
        }

        this.setTitle(text);
      });
    }
  }
}

export default FAQItemFields;
