import ContentTypes_properties from "@coremedia/studio-client.cap-base-models/content/ContentTypes_properties";
import CopyResourceBundleProperties from "@coremedia/studio-client.main.editor-components/configuration/CopyResourceBundleProperties";
import StudioPlugin from "@coremedia/studio-client.main.editor-components/configuration/StudioPlugin";
import AddTabbedDocumentFormsPlugin from "@coremedia/studio-client.main.editor-components/sdk/plugins/AddTabbedDocumentFormsPlugin";
import TabbedDocumentFormDispatcher from "@coremedia/studio-client.main.editor-components/sdk/premular/TabbedDocumentFormDispatcher";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
import CMFAQForm from "./forms/CMFAQForm";
import FAQLabels_properties from "./FAQLabels_properties";
import IEditorContext from "@coremedia/studio-client.main.editor-components/sdk/IEditorContext";
import editorContext from "@coremedia/studio-client.main.editor-components/sdk/editorContext";
import FAQUtils from "./utils/FAQUtils";

interface FAQStudioPluginConfig extends Config<StudioPlugin> {
}

class FAQStudioPlugin extends StudioPlugin {
  declare Config: FAQStudioPluginConfig;

  static readonly xtype: string = "com.coremedia.blueprint.faq.studio.config.faqStudioPlugin";

  constructor(config: Config<FAQStudioPlugin> = null) {
    super(ConfigUtils.apply(Config(FAQStudioPlugin, {

      rules: [

        Config(TabbedDocumentFormDispatcher, {
          plugins: [
            Config(AddTabbedDocumentFormsPlugin, {
              documentTabPanels: [
                Config(CMFAQForm, { itemId: "CMFAQ" }),
              ],
            }),
          ],
        }),

      ],

      configuration: [
        new CopyResourceBundleProperties({
          destination: resourceManager.getResourceBundle(null, ContentTypes_properties),
          source: resourceManager.getResourceBundle(null, FAQLabels_properties),
        }),
      ],

    }), config));
  }

  override init(editorContext: IEditorContext) {
    super.init(editorContext);

    // register content initializer for FAQ
    editorContext.registerContentInitializer("CMFAQ", FAQUtils.faqContentInitializer);
  }
}

export default FAQStudioPlugin;
