import DocumentForm from "@coremedia/studio-client.main.editor-components/sdk/premular/DocumentForm";
import DocumentTabPanel from "@coremedia/studio-client.main.editor-components/sdk/premular/DocumentTabPanel";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BlueprintTabs_properties from "@coremedia-blueprint/studio-client.main.blueprint-forms/BlueprintTabs_properties";
import DefaultExtraDataForm from "@coremedia-blueprint/studio-client.main.blueprint-forms/forms/components/DefaultExtraDataForm";
import DetailsDocumentForm from "@coremedia-blueprint/studio-client.main.blueprint-forms/forms/containers/DetailsDocumentForm";
import MediaDocumentForm from "@coremedia-blueprint/studio-client.main.blueprint-forms/forms/containers/MediaDocumentForm";
import MultiLanguageDocumentForm from "@coremedia-blueprint/studio-client.main.blueprint-forms/forms/containers/MultiLanguageDocumentForm";
import RelatedDocumentForm from "@coremedia-blueprint/studio-client.main.blueprint-forms/forms/containers/RelatedDocumentForm";
import TeaserDocumentForm from "@coremedia-blueprint/studio-client.main.blueprint-forms/forms/containers/TeaserDocumentForm";
import ValidityDocumentForm from "@coremedia-blueprint/studio-client.main.blueprint-forms/forms/containers/ValidityDocumentForm";
import ViewTypeSelectorForm from "@coremedia-blueprint/studio-client.main.blueprint-forms/forms/containers/ViewTypeSelectorForm";
import FAQItemsPropertyField from "../fields/FAQItemsPropertyField";
import MetaDataWithoutSearchableForm from "@coremedia-blueprint/studio-client.main.blueprint-forms/forms/containers/MetaDataWithoutSearchableForm";

interface CMFAQFormConfig extends Config<DocumentTabPanel> {
}

class CMFAQForm extends DocumentTabPanel {
  declare Config: CMFAQFormConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.studio.config.cmfaqForm";

  constructor(config: Config<CMFAQForm> = null) {
    super(ConfigUtils.apply(Config(CMFAQForm, {
      items: [
        Config(DocumentForm, {
          title: BlueprintTabs_properties.Tab_content_title,
          itemId: "contentTab",
          items: [
            Config(DetailsDocumentForm),
            Config(FAQItemsPropertyField),
            Config(TeaserDocumentForm, {
              bindTo: config.bindTo,
              collapsed: true,
            }),
            Config(MediaDocumentForm, { bindTo: config.bindTo }),
            Config(RelatedDocumentForm, { bindTo: config.bindTo }),
            Config(ViewTypeSelectorForm, { bindTo: config.bindTo }),
            Config(ValidityDocumentForm, { bindTo: config.bindTo }),
          ]
        }),
        Config(DefaultExtraDataForm),
        Config(MultiLanguageDocumentForm, { bindTo: config.bindTo }),
        Config(MetaDataWithoutSearchableForm),
      ]
    }), config));
  }
}

export default CMFAQForm;
