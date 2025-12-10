import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import PropertyFieldGroup from "@coremedia/studio-client.main.editor-components/sdk/premular/PropertyFieldGroup";
import FAQItemsEditor from "../components/FAQItemsEditor";
import FAQLabels_properties from "../FAQLabels_properties";

interface FAQItemsPropertyFieldConfig extends Config<PropertyFieldGroup> {

}

class FAQItemsPropertyField extends PropertyFieldGroup {

  declare Config: FAQItemsPropertyFieldConfig;

  constructor(config: Config<FAQItemsPropertyField> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(FAQItemsPropertyField, {
      itemId: "faqItemsPropertyField",
      title: FAQLabels_properties.FAQItemsPropertyField_title,
      items: [
        Config(FAQItemsEditor, { bindTo: config.bindTo }),
      ]
    }), config));
  }

}

export default FAQItemsPropertyField;
