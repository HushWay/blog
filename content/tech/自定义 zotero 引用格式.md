# 自定义 zotero 引用格式

+++
title = '自定义 zotero 引用格式'
date = 2024-09-30T15:09:00+08:00
draft = false
+++



我想用使用`1.Breast tumours maintain a reservoir of subclonal diversity during expansion, Nature, 2021`格式来引用参考文献，采用以下方式进行改造（基于zotero v7.0.5版本）。完成后，在选中条目或者正在阅读的文章中按下`ctr+shift+c`快捷键，此引用格式即粘贴到剪贴板。

1. 新建`nature.csl`文件，包括以下内容

   ```
   <?xml version="1.0" encoding="utf-8"?>
   <style xmlns="http://purl.org/net/xbiblio/csl" class="in-text" version="1.0" demote-non-dropping-particle="sort-only" default-locale="en-GB">
     <info>
       <title>Nature</title>
       <id>http://www.zotero.org/styles/nature</id>
       <link href="http://www.zotero.org/styles/nature" rel="self"/>
       <link href="http://www.nature.com/nature/authors/gta/index.html#a5.4" rel="documentation"/>
       <link href="http://www.nature.com/srep/publish/guidelines#references" rel="documentation"/>
       <author>
         <name>Michael Berkowitz</name>
         <email>mberkowi@gmu.edu</email>
       </author>
       <category citation-format="numeric"/>
       <category field="science"/>
       <category field="generic-base"/>
       <issn>0028-0836</issn>
       <eissn>1476-4687</eissn>
       <updated>2024-01-22T03:08:05+00:00</updated>
       <rights license="http://creativecommons.org/licenses/by-sa/3.0/">This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 License</rights>
     </info>
     <macro name="title">
       <choose>
         <if type="bill book graphic legal_case legislation motion_picture report song" match="any">
           <text variable="title" font-style="" text-case="title"/>
         </if>
         <else>
           <text variable="title"/>
         </else>
       </choose>
     </macro>
     <macro name="author">
       <names variable="author">
         <name sort-separator=", " delimiter=", " and="symbol" initialize-with=". " delimiter-precedes-last="never" name-as-sort-order="all"/>
         <label form="short" prefix=", "/>
         <et-al font-style=""/>
       </names>
     </macro>
     <macro name="access">
       <choose>
         <if variable="volume" type="article dataset software" match="any"/>
         <else-if variable="DOI">
           <text variable="DOI" prefix="doi:"/>
         </else-if>
       </choose>
     </macro>
     <macro name="access-data">
       <choose>
         <if type="dataset software" match="any">
           <text variable="DOI" prefix="https://doi.org/"/>
         </if>
       </choose>
     </macro>
     <macro name="issuance">
       <choose>
         <if type="bill book graphic legal_case legislation motion_picture song thesis chapter paper-conference" match="any">
           <group delimiter="; " suffix=".">
             <group delimiter=", " prefix="(" suffix=")">
               <text variable="publisher" form="long"/>
               <text variable="publisher-place"/>
               <date variable="issued">
                 <date-part name="year"/>
               </date>
             </group>
           </group>
         </if>
         <else-if type="article">
           <group delimiter=" ">
             <choose>
               <if variable="genre" match="any">
                 <text variable="genre" text-case="capitalize-first"/>
               </if>
               <else>
                 <text term="article" text-case="capitalize-first"/>
               </else>
             </choose>
             <text term="at"/>
             <choose>
               <if variable="DOI" match="any">
                 <text variable="DOI" prefix="https://doi.org/"/>
               </if>
               <else>
                 <text variable="URL"/>
               </else>
             </choose>
             <date date-parts="year" form="text" variable="issued" prefix="(" suffix=")"/>
           </group>
         </else-if>
         <else-if type="dataset software" match="any">
           <group delimiter=" ">
             <text variable="publisher"/>
             <text macro="access-data"/>
             <date date-parts="year" form="text" variable="issued" prefix="(" suffix=")"/>
           </group>
         </else-if>
         <else-if type="report webpage post post-weblog" match="any">
           <group delimiter=" ">
             <text variable="URL"/>
             <date date-parts="year" form="text" variable="issued" prefix="(" suffix=")"/>
           </group>
         </else-if>
         <else>
           <date variable="issued" prefix="" suffix="">
             <date-part name="year"/>
           </date>
         </else>
       </choose>
     </macro>
     <macro name="container-title">
       <choose>
         <if type="article-journal">
           <text variable="container-title" font-style="" form="short"/>
         </if>
         <else>
           <text variable="container-title" font-style=""/>
         </else>
       </choose>
     </macro>
     <macro name="editor">
       <choose>
         <if type="chapter paper-conference" match="any">
           <names variable="editor" prefix="(" suffix=")">
             <label form="short" suffix=" "/>
             <name and="symbol" delimiter-precedes-last="never" initialize-with=". " name-as-sort-order="all"/>
           </names>
         </if>
       </choose>
     </macro>
     <macro name="volume">
       <choose>
         <if type="article-journal" match="any">
           <text variable="volume" font-weight="bold" suffix=","/>
         </if>
         <else>
           <group delimiter=" ">
             <label variable="volume" form="short"/>
             <text variable="volume"/>
           </group>
         </else>
       </choose>
     </macro>
     <citation collapse="citation-number">
       <layout suffix="">
         <text variable="citation-number" suffix="."/>
         <group delimiter=", ">
           <text macro="title" suffix=""/>
           <choose>
             <if type="chapter paper-conference" match="any">
               <text term="in"/>
             </if>
           </choose>
           <text macro="container-title"/>
           <text macro="editor"/>
           <text macro="issuance"/>
         </group>
       </layout>
     </citation>
     <bibliography et-al-min="0" et-al-use-first="1" second-field-align="flush" entry-spacing="0" line-spacing="2">
       <layout suffix="">
         <text variable="citation-number" suffix="."/>
         <group delimiter=", ">
           <text macro="title" suffix=""/>
           <choose>
             <if type="chapter paper-conference" match="any">
               <text term="in"/>
             </if>
           </choose>
           <text macro="container-title"/>
           <text macro="editor"/>
           <text macro="issuance"/>
         </group>
       </layout>
     </bibliography>
   </style>
   ```

2. zotero => 编辑 => 设置 => 引用 => + 添加 nature.csl文件

3. 导出 => 条目格式 => 选择Nature