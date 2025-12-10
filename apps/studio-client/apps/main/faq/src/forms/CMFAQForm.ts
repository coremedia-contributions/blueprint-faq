import BlueprintTabs_properties from "@coremedia-blueprint/studio-client.main.blueprint-forms/BlueprintTabs_properties";
import DocumentForm from "@coremedia/studio-client.main.editor-components/sdk/premular/DocumentForm";
import DocumentTabPanel from "@coremedia/studio-client.main.editor-components/sdk/premular/DocumentTabPanel";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import SettingsDocumentForm
  from "@coremedia-blueprint/studio-client.main.blueprint-forms/custom/forms/SettingsDocumentForm";
import InfoDocumentForm from "@coremedia-blueprint/studio-client.main.blueprint-forms/custom/forms/InfoDocumentForm";
import TagsDocumentForm from "@coremedia-blueprint/studio-client.main.blueprint-forms/custom/forms/TagsDocumentForm";
import MetadataDocumentForm
  from "@coremedia-blueprint/studio-client.main.blueprint-forms/custom/forms/MetadataDocumentForm";
import TeaserDocumentForm
  from "@coremedia-blueprint/studio-client.main.blueprint-forms/custom/forms/TeaserDocumentForm";
import MediaDocumentForm
  from "@coremedia-blueprint/studio-client.main.blueprint-forms/forms/containers/MediaDocumentForm";
import FAQItemsPropertyField from "../fields/FAQItemsPropertyField";
import DetailsDocumentForm
  from "@coremedia-blueprint/studio-client.main.blueprint-forms/forms/containers/DetailsDocumentForm";
import RelatedTabDocumentForm
  from "@coremedia-blueprint/studio-client.main.blueprint-forms/custom/forms/RelatedTabDocumentForm";
import AddItemsPlugin from "@coremedia/studio-client.ext.ui-components/plugins/AddItemsPlugin";
import AuthorLinkListDocumentForm
  from "@coremedia-blueprint/studio-client.main.blueprint-forms/forms/containers/AuthorLinkListDocumentForm";
import SEODocumentForm from "@coremedia-blueprint/studio-client.main.blueprint-forms/custom/forms/SEODocumentForm";
import StructPropertyField
  from "@coremedia/studio-client.main.editor-components/sdk/premular/fields/struct/StructPropertyField";
import Component from "@jangaroo/ext-ts/Component";

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
            Config(MediaDocumentForm)
          ]
        }),
        Config(RelatedTabDocumentForm, {
          ...ConfigUtils.append({
            plugins: [
              Config(AddItemsPlugin, {
                items: [Config(AuthorLinkListDocumentForm, { collapsed: true })]
              })
            ]
          })
        }),
        Config(TeaserDocumentForm, { withPictures: false, autoHide: false }),
        Config(SEODocumentForm),
        Config(TagsDocumentForm),
        Config(MetadataDocumentForm),
        Config(SettingsDocumentForm, {
          ...ConfigUtils.append(({
            plugins: [
              Config(AddItemsPlugin, {
                items: [
                  Config(StructPropertyField, {
                    propertyName: "questionsAnswers",
                  })
                ],
                recursive: true,
                after: [
                  Config(Component, { itemId: "localSettings" })
                ],
              })
            ]
          }))
        }),
        Config(InfoDocumentForm)
      ]
    }), config));
  }
}

export default CMFAQForm;
