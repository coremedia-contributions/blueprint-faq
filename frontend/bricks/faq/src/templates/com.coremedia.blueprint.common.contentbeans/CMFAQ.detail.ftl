<#-- @ftlvariable name="self" type="com.coremedia.blueprint.common.contentbeans.CMFAQ" -->

<#import "*/node_modules/@coremedia/brick-utils/src/freemarkerLibs/utils.ftl" as utils />
<#--
    Template Description:

    This template provides a detail view for the CMFAQ content type
-->

<#assign blockClass=cm.localParameters().blockClass!"cm-details" />
<#assign typeCls="content-type--" + self.content.type.name/>
<#assign relatedView=cm.localParameters().relatedView!"asRelated" />
<#assign renderDate=cm.localParameter("renderDate", true) />
<#assign renderTags=cm.localParameter("renderTags", true) />
<#assign renderLocation=cm.localParameter("renderLocation", false) />
<#assign renderAuthors=cm.localParameter("renderAuthors", true) />
<#assign renderRelated=cm.localParameter("renderRelated", true) />
<#assign readingTimeSettings=bp.setting(self, "readingTime", {}) />
<#assign showReadingTime=readingTimeSettings["showOnDetails"]???then(readingTimeSettings["showOnDetails"], true) />

<div class="${blockClass} ${typeCls}" <@preview.metadata self.content />>
  <#-- scroll progress indicator-->
  <@cm.include self=self view="_scrollIndicator"/>

  <article class="${blockClass}__content">

    <div class="${blockClass}__headlines">
      <#-- kicker -->
      <span class="${blockClass}__kicker"<@preview.metadata ["properties.kicker", {"editable": true}]/>>${self.kicker!""}</span>
      <#-- title -->
      <h1 class="${blockClass}__headline"<@preview.metadata ["properties.title", {"editable": true}]/>>${self.title!""}</h1>
      <#-- subtitle -->
      <span  class="${blockClass}__subtitle"<@preview.metadata ["properties.subtitle", {"editable": true}]/>>${self.subtitle!""}</span>
    </div>

    <#-- media -->
    <@cm.include self=self view="_detailMedia" params=cm.localParameters() />

    <#-- text -->
    <#if self.detailText?has_content>
      <div class="${blockClass}__text cm-richtext"<@preview.metadata ["properties.detailText", {"editable": true}]/>>
        <@cm.include self=self.detailText!cm.UNDEFINED />
      </div>
    </#if>

    <!-- items -->
    <@cm.include self=self view="_items" />

  </article>

  <#-- tags -->
  <#if renderTags && self.subjectTaxonomy?has_content>
    <@cm.include self=self view="_tagList" params={"parentClass": blockClass} />
  </#if>

  <#-- related -->
  <#if renderRelated && self.related?has_content>
    <@cm.include self=self view="_related" params={"relatedView": relatedView, "additionalClass": "${blockClass}__related"}/>
  </#if>

  <#-- extensions -->
  <@cm.hook id=bp.viewHookEventNames.VIEW_HOOK_END />
</div>
