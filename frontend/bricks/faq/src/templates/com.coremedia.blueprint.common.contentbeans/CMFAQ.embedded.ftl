<#-- @ftlvariable name="self" type="com.coremedia.blueprint.common.contentbeans.CMFAQ" -->

<#assign baseCls="cm-faq" />
<#if self.items?has_content>
  <div class="${baseCls} ${baseCls}--embedded"<@preview.metadata self.content />>
    <#if self.teaserTitle?has_content>
      <h3>${self.teaserTitle}</h3>
    </#if>
    <@cm.include self=self view="_items"/>
  </div>
</#if>
