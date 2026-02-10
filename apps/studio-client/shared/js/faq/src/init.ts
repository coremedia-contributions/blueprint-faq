import contentTypeLocalizationRegistry from "@coremedia/studio-client.cap-base-models/content/contentTypeLocalizationRegistry";
import typeFAQ from "./icons/type-faq.svg";
import FAQContentTypes_properties from "./FAQContentTypes_properties";

contentTypeLocalizationRegistry.addLocalization("CMFAQ", {
  displayName: FAQContentTypes_properties.CMFAQ_displayName,
  description: FAQContentTypes_properties.CMFAQ_description,
  svgIcon: typeFAQ,
  properties: {
    questionsAnswers: {
      displayName: FAQContentTypes_properties.CMFAQ_questionsAnswers_displayName,
      description: FAQContentTypes_properties.CMFAQ_questionsAnswers_description,
      emptyText: FAQContentTypes_properties.CMFAQ_questionsAnswers_emptyText,
    },
  },
});
