const { jangarooConfig } = require("@jangaroo/core");

module.exports = jangarooConfig({
  type: "code",
  sencha: {
    name: "com.coremedia.blueprint__faq-studio",
    namespace: "com.coremedia.blueprint.faq.studio",
    css: [
      {
        path: "resources/css/faq-ui.css",
        bundle: false,
        includeInBundle: false,
      },
    ],
    studioPlugins: [
      {
        mainClass: "com.coremedia.blueprint.faq.studio.FAQStudioPlugin",
        name: "FAQ Extension",
      },
    ],
  },
});
