<?xml version="1.0" encoding="iso-8859-1" standalone="no"?>

<!--
	EU Module 1 Style-Sheet

	Version 1.4
	July 2009
-->

<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:eu="http://europa.eu.int" 
	xmlns:xlink="http://www.w3c.org/1999/xlink">
   
   <xsl:output method="html" encoding="UTF-8" indent="no"/>
   
   <xsl:template match="/">
      <html>
         <head>
            <title>EU Module 1 - DTD version <xsl:value-of select="/eu:eu-backbone/@dtd-version"/></title>
            <style type="text/css">
				h1, h2, h3, h4 {margin-top:3pt ; margin-bottom:0pt}
				ul {margin-bottom:0pt ; margin-top:0pt}
			</style>
         </head>
			<body>
				<center>
					<h1>EU Module 1</h1>
					<small>DTD version <xsl:value-of select="/eu:eu-backbone/@dtd-version"/></small>
				</center>
				<xsl:apply-templates select="//envelope"/>
				<br/>
				<xsl:apply-templates select="//m1-eu"/>
			</body>
		</html>
	</xsl:template>
	
	<xsl:template match="*|@*" mode="data">
		<xsl:value-of select="."/>
	</xsl:template>
	
	<xsl:template match="*|@*" mode="country">
		<xsl:value-of select="translate(.,'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')"/>
	</xsl:template>
	
	<xsl:template match="*|@*" mode="csv">
		<xsl:value-of select="."/>
		<xsl:if test="position() != last()"><xsl:text>, </xsl:text></xsl:if>
	</xsl:template>
	
	<xsl:template match="*|@*" mode="line">
		<xsl:value-of select="."/>
		<xsl:if test="position() != last()"><br/></xsl:if>
	</xsl:template>
	
	<xsl:template match="*|@*" mode="agency">
		<xsl:choose>
			<xsl:when test="@code='AT-AGES'">Austria - AGES - PharmMed LCM</xsl:when>
			<xsl:when test="@code='BE-FAMHP'">Belgium - Agence F�d�rale des M�dicaments et des Produits de Sant�</xsl:when>
			<xsl:when test="@code='BG-BDA'">Bulgaria - Bulgarian Drug Agency</xsl:when>
			<xsl:when test="@code='BG-NVS'">Bulgaria - Institute for Control of Veterinary Products</xsl:when>
			<xsl:when test="@code='CY-VS'">Cyprus - Ministry of Health Pharmaceutical Services</xsl:when>
			<xsl:when test="@code='CZ-SUKL'">Czech Rep - State Institut f�r Drug Control</xsl:when>
			<xsl:when test="@code='CZ-USKVBL'">Czech Rep - Institute for State Control of Veterinary Biologicals and Medicaments</xsl:when>
			<xsl:when test="@code='DE-BFARM'">Germany - BfArM - Bundesinstitut f�r Arzneimittel und Medizinprodukte</xsl:when>
			<xsl:when test="@code='DE-BVL'">Germany - Bundesamt f�r Verbraucherschutz und Lebensmittelsicherheit, Ref. 301</xsl:when>
			<xsl:when test="@code='DE-PEI'">Germany - Paul-Ehrlich Institut</xsl:when>
			<xsl:when test="@code='DK-DKMA'">Denmark - Danish Medicines Agency</xsl:when>
			<xsl:when test="@code='EE-SAM'">Estonia - State Agency of Medicines</xsl:when>
			<xsl:when test="@code='EL-EOF'">Greece - EOF - National Drug Organisation</xsl:when>
			<xsl:when test="@code='ES-AGEMED'">Spain - Agencia Espa�ola de Medicamentos y Productos Sanitarios</xsl:when>
			<xsl:when test="@code='FI-NAM'">Finland - National Agency for Medicines</xsl:when>
			<xsl:when test="@code='FR-AFSSAPS'">France - AFSSAPS - Agence Fran�aise de S�curit� Sanitaire des Produits de Sant�</xsl:when>
			<xsl:when test="@code='FR-ANMV'">France - ANMV - Agence Nationale du M�dicament V�t�rinaire, Agence Fran�aise de S�curit� Sanitaire des Aliments</xsl:when>
			<xsl:when test="@code='HU-IVMP'">Hungary - National Institut of Pharmacy</xsl:when>
			<xsl:when test="@code='HU-OGYI'">Hungary - Institute for Veterinary Medicinal Products</xsl:when>
			<xsl:when test="@code='IE-IMB'">Ireland - Irish Medicines Board</xsl:when>
			<xsl:when test="@code='IE-DAFF'">Ireland - Dept of Agriculture &amp; Food</xsl:when>
			<xsl:when test="@code='IS-IMCA'">Iceland - Icelandic Medicines Control Agency</xsl:when>
			<xsl:when test="@code='IT-AIFA'">Italy - Agenzia Italiana del Farmaco</xsl:when>
			<xsl:when test="@code='IT-LMV'">Italy - Laboratorio di Medicina Veterinaria, Istituto Superiore di Sanit�</xsl:when>
			<xsl:when test="@code='IT-SPV'">Italy - Ministero della Salute, Direzione Generale della Sanit� Pubblica Veterinaria</xsl:when>
			<xsl:when test="@code='LI-LLV'">Liechtenstein - Kontrollstelle f�r Arzneimittel beim Amt f�r Lebensmittelkontrolle und Veterin�rwesen</xsl:when>
			<xsl:when test="@code='LT-SMCA'">Lithuania - State Medicines Control Agency</xsl:when>
			<xsl:when test="@code='LT-VVPI'">Lithuania - Lithuanian State Inspection on Veterinary Preparations</xsl:when>
			<xsl:when test="@code='LT-VMVT'">Lithuania - State Food and Veterinary Service</xsl:when>
			<xsl:when test="@code='LU-MINSANT'">Luxembourg - Direction de la Sant� Villa Louvigny Division de la Pharmacie et des Medicaments</xsl:when>
			<xsl:when test="@code='LV-ZVA'">Latvia - State Agency of Medicines</xsl:when>
			<xsl:when test="@code='MT-MRU'">Malta - Medicines Regulatory Unit</xsl:when>
			<xsl:when test="@code='MT-MEDAUTH'">Malta - Medicines Authority Divizjoni Tas-Sahha Bezzjoni Ghar-Regolazzjoni Tal-Medicini</xsl:when>
			<xsl:when test="@code='NL-MEB'">Netherlands - College ter Beoordeling van Geneesmiddelen Medicines Evaluation Board</xsl:when>
			<xsl:when test="@code='NO-NOMA'">Norway - The Norwegian Medicines Agency</xsl:when>
			<xsl:when test="@code='PL-URPL'">Poland - Office for Registration of Medicinal Products, Medical Devices and Biocidal Products</xsl:when>
			<xsl:when test="@code='PT-DGV'">Portugal - DGV - Direc��o Geral de Veterin�ria, Divis�o de Meios de Defesa da Sa�de Animal</xsl:when>
			<xsl:when test="@code='PT-INFARMED'">Portugal - INFARMED - Instituto Nacional da Farm�cia e do Medicamento Parque da Sa�de de Lisboa</xsl:when>
			<xsl:when test="@code='RO-ANM'">Romania - National Medicines Agency</xsl:when>
			<xsl:when test="@code='SE-MPA'">Sweden - Medical Products Agency</xsl:when>
			<xsl:when test="@code='SI-JAZMP'">Slovenia - Agencija za zdravila in medicinske pripmocke</xsl:when>
			<xsl:when test="@code='SK-SIDC'">Slovak Rep - State Institute for Drug Control</xsl:when>
			<xsl:when test="@code='SK-USKVBL'">Slovak Rep - Institute for State Control of Veterinary Biologicals and Medicaments Biovetsk� 34</xsl:when>
			<xsl:when test="@code='UK-MHRA'">Medicines and Healthcare products Regulatory Agency, Market Towers</xsl:when>
			<xsl:when test="@code='UK-VMD'">VMD - Veterinary Medicines Directorate</xsl:when>
			<xsl:when test="@code='EU-EMEA'">EMEA - European Medicines Agency</xsl:when>
		</xsl:choose>
		<xsl:text> </xsl:text>(<xsl:value-of select="@code"/>)
	</xsl:template>
	
	<xsl:template match="*|@*" mode="submission">
		Type: 
		<xsl:choose>
			<xsl:when test="@type='initial-maa'">Initial Marketing Authorisation</xsl:when>
			<xsl:when test="@type='var-type1a'">Variation Type IA</xsl:when>
			<xsl:when test="@type='var-type1b'">Variation Type IB</xsl:when>
			<xsl:when test="@type='var-type2'">Variation Type II</xsl:when>
			<xsl:when test="@type='var-nat'">National Variation</xsl:when>
			<xsl:when test="@type='extension'">Extension</xsl:when>
			<xsl:when test="@type='psur'">Periodic Safety Update Report</xsl:when>
			<xsl:when test="@type='renewal'">Renewal</xsl:when>
			<xsl:when test="@type='supplemental-info'">Supplemental Information</xsl:when>
			<xsl:when test="@type='fum'">Follow-up Measure</xsl:when>
			<xsl:when test="@type='specific-obligation'">Specific Obligation</xsl:when>
			<xsl:when test="@type='asmf'">Active Substance Master File</xsl:when>
			<xsl:when test="@type='pmf'">Plasma Master File</xsl:when>
			<xsl:when test="@type='referral'">Referral</xsl:when>
			<xsl:when test="@type='annual-reassessment'">Annual Reassessment</xsl:when>
			<xsl:when test="@type='usr'">Urgent Safety Restriction</xsl:when>
			<xsl:when test="@type='paed-article-29'">Paediatric Submission, Article 29</xsl:when>
			<xsl:when test="@type='paed-article-46'">Paediatric Submission, Article 46</xsl:when>
			<xsl:when test="@type='article-58'">Article 58</xsl:when>
			<xsl:when test="@type='notification-61-3'">Notification 61(3)</xsl:when>
			<xsl:when test="@type='transfer-ma'">Transfer of Marketing Authorisation</xsl:when>
			<xsl:when test="@type='corrigendum'">Corrigendum</xsl:when>
			<xsl:when test="@type='lifting-suspension'">Lifting of a Suspension</xsl:when>
			<xsl:when test="@type='withdrawal'">Withdrawal during Assessment or Withdrawal of MA</xsl:when>
			<xsl:when test="@type='reformat'">Reformat with no Content Change</xsl:when>
		</xsl:choose>
		<br/>
		<xsl:if test="string-length(@mode) > 0">
			Mode: 
			<xsl:choose>
				<xsl:when test="@mode='single'">Single</xsl:when>
				<xsl:when test="@mode='grouping'">Grouping</xsl:when>
				<xsl:when test="@mode='worksharing'">Worksharing</xsl:when>
			</xsl:choose>
		</xsl:if>
		<xsl:if test="string-length(number) > 0">
			<br/>
			Number: <xsl:apply-templates select="number"/>
		</xsl:if>
	</xsl:template>
	
	<xsl:template match="*|@*" mode="procedure">
		<xsl:choose>
			<xsl:when test="@type='centralised'">Centralised Procedure</xsl:when>
			<xsl:when test="@type='national'">National Procedure</xsl:when>
			<xsl:when test="@type='mutual-recognition'">Mutual Recognition Procedure (MRP)</xsl:when>
			<xsl:when test="@type='decentralised'">Decentralised Procedure (DCP)</xsl:when>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template match="*|@*" mode="pidoc-type">
		<xsl:choose>
			<xsl:when test="@type='spc'">Summary of Product Characteristics (SPC)</xsl:when>
			<xsl:when test="@type='outer'">Outer Packaging</xsl:when>
			<xsl:when test="@type='interpack'">Internal Packaging</xsl:when>
			<xsl:when test="@type='impack'">Immediate Packaging</xsl:when>
			<xsl:when test="@type='other'">Other Product Information</xsl:when>
			<xsl:when test="@type='pl'">Package Leaflet</xsl:when>
			<xsl:when test="@type='combined'">Combined</xsl:when>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template match="envelope">
		<center>
			<table width="90%" border="1px" frame="border" rules="groups" cellpadding="2" cellspacing="0">
				<tr>
					<td colspan="2"><h3>Envelope for <xsl:apply-templates select="./@country" mode="country"/></h3></td>
				</tr>
				<tr>
					<td width="20%" valign="top">Submission: </td>
					<td><xsl:apply-templates select="submission" mode="submission"/></td>
				</tr>
				<tr>
					<td valign="top">Tracking Number(s): </td>
					<td><xsl:apply-templates select="submission/tracking/number" mode="line"/></td>
				</tr>
				<tr>
					<td>Applicant: </td>
					<td><xsl:apply-templates select="applicant" mode="data"/></td>
				</tr>
				<tr>
					<td>Agency: </td>
					<td><xsl:apply-templates select="agency" mode="agency"/></td>
				</tr>
				<tr>
					<td>Procedure: </td>
					<td><xsl:apply-templates select="procedure" mode="procedure"/></td>
				</tr>
				<tr>
					<td>Invented Name: </td>
					<td><xsl:apply-templates select="invented-name" mode="csv"/></td>
				</tr>
				<tr>
					<td>INN: </td>
					<td><xsl:apply-templates select="inn" mode="csv"/></td>
				</tr>
				<tr>
					<td>Sequence: </td>
					<td><xsl:apply-templates select="sequence" mode="data"/></td>
				</tr>
				<tr>
					<td>Related Sequence: </td>
					<td><xsl:apply-templates select="related-sequence" mode="csv"/></td>
				</tr>
				<tr>
					<td>Submission Description: </td>
					<td><xsl:apply-templates select="submission-description" mode="data"/></td>
				</tr>
			</table>
		</center>
	</xsl:template>

	<xsl:template match="specific">
		For <xsl:apply-templates select="./@country" mode="country"/>: 
		<ul type="square">
			<xsl:apply-templates select="leaf | node-extension"/>
		</ul>
	</xsl:template>
	
	<xsl:template name="pi-doc-row">
		<xsl:param name="ctry"/>
		<tr>
			<td align="center"><xsl:apply-templates select="$ctry" mode="country"/></td>
			<td><xsl:apply-templates select="//pi-doc[./@country=$ctry and @type='spc']/leaf" mode="plain"/><br/></td>
			<td><xsl:apply-templates select="//pi-doc[./@country=$ctry and @type='annex2']/leaf" mode="plain"/><br/></td>
			<td><xsl:apply-templates select="//pi-doc[./@country=$ctry and @type='outer']/leaf" mode="plain"/><br/></td>
			<td><xsl:apply-templates select="//pi-doc[./@country=$ctry and @type='interpack']/leaf" mode="plain"/><br/></td>
			<td><xsl:apply-templates select="//pi-doc[./@country=$ctry and @type='impack']/leaf" mode="plain"/><br/></td>
			<td><xsl:apply-templates select="//pi-doc[./@country=$ctry and @type='pl']/leaf" mode="plain"/><br/></td>
			<td><xsl:apply-templates select="//pi-doc[./@country=$ctry and @type='other']/leaf" mode="plain"/><br/></td>
			<td><xsl:apply-templates select="//pi-doc[./@country=$ctry and @type='combined']/leaf" mode="plain"/><br/></td>
		</tr>
	</xsl:template>
	
	<xsl:template match="pi-doc">
		<xsl:variable name="pos" select="position()"/>
		<xsl:variable name="ctry" select="./@country"/>
		
		<xsl:variable name="prev" select="count(//pi-doc[position() &lt; $pos and @country = $ctry])"/>
		<xsl:if test="$prev = 0">
			<xsl:call-template name="pi-doc-row">
				<xsl:with-param name="ctry" select="$ctry"/>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>
	
	<xsl:template match="leaf" mode="plain">
		<a>
			<xsl:attribute name="href"><xsl:value-of select="@xlink:href"/></xsl:attribute>
			<xsl:value-of select="title"/>
		</a>
		<xsl:text> </xsl:text>
		(<font color="red"><xsl:value-of select="@operation"/></font> - <font color="green"><xsl:value-of select="../@xml:lang"/></font>)
		<xsl:if test="position() != last()"><br/></xsl:if>
	</xsl:template>
	
	<xsl:template match="leaf">
		<li>
			<a>
				<xsl:attribute name="href"><xsl:value-of select="@xlink:href"/></xsl:attribute>
				<xsl:value-of select="title"/>
			</a>
			<xsl:text> </xsl:text>
			(<font color="red"><xsl:value-of select="@operation"/></font>)
			<xsl:if test="position() != last()"><br/></xsl:if>
		</li>
	</xsl:template>	
	
	<xsl:template match="node-extension">
		<li><xsl:apply-templates select="title" mode="data"/>
			<ul type="square">
				<xsl:apply-templates select="leaf | node-extension"/>
			</ul>
		</li>
	</xsl:template>

	<xsl:template match="m1-3-1-spc-label-pl">
		<table width="100%" cellpadding="2" cellspacing="0" border="1" style="font-size: 9pt">
			<tr>
				<th width="11%">Country</th>
				<th width="11%">SPC</th>
				<th width="11%">Annex II</th>
				<th width="11%">Outer Packaging</th>
				<th width="11%">Intermediate Packaging</th>
				<th width="11%">Immediate Packaging</th>
				<th width="11%">Package Leaflet</th>
				<th width="11%">Other</th>
				<th width="11%">Combined</th>
			</tr>
			<xsl:apply-templates select="pi-doc"/>
		</table>
	</xsl:template>

	<xsl:template match="m1-eu">
		<center>
			<table width="90%" cellpadding="5" cellspacing="2">
				<tr>
					<td colspan="2"><h2>Module 1 EU</h2></td>
				</tr>
				<tr>
					<td width="5%" valign="top"><h3>1.0</h3></td>
					<td width="95%">
						<h3>Cover Letter</h3>
						<xsl:apply-templates select="m1-0-cover/specific"/>
					</td>
				</tr>
				<tr>
					<td valign="top"><h3>1.2</h3></td>
					<td>
						<h3>Application Form</h3>
						<xsl:apply-templates select="m1-2-form/specific"/>
					</td>
				</tr>
				<tr>
					<td valign="top"><h3>1.3</h3></td>
					<td>
						<h3>Product Information</h3>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.3.1</h4></td>
					<td>
						<h4>SPC, Labelling and Package Leaflet</h4>
						<xsl:apply-templates select="m1-3-pi/m1-3-1-spc-label-pl"/>
						<xsl:apply-templates select="m1-3-pi/m1-3-1-pim/leaf"/>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.3.2</h4></td>
					<td>
						<h4>Mock-up</h4>
						<xsl:apply-templates select="m1-3-pi/m1-3-2-mockup/specific"/>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.3.3</h4></td>
					<td>
						<h4>Specimen</h4>
						<xsl:apply-templates select="m1-3-pi/m1-3-3-specimen/specific"/>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.3.4</h4></td>
					<td>
						<h4>Consultation with Target Patient Groups</h4>
						<xsl:apply-templates select="m1-3-pi/m1-3-4-consultation/specific"/>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.3.5</h4></td>
					<td>
						<h4>Product Information already approved in the Member States</h4>
						<xsl:apply-templates select="m1-3-pi/m1-3-5-approved/specific"/>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.3.6</h4></td>
					<td>
						<h4>Braille</h4>
						<ul type="square">
							<xsl:apply-templates select="m1-3-pi/m1-3-6-braille/leaf | m1-3-pi/m1-3-6-braille/node-extension"/>
						</ul>
					</td>
				</tr>
				<tr>
					<td valign="top"><h3>1.4</h3></td>
					<td>
						<h3>Information about the Experts</h3>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.4.1</h4></td>
					<td>
						<h4>Quality</h4>
						<ul type="square">
							<xsl:apply-templates select="m1-4-expert/m1-4-1-quality/leaf | m1-4-expert/m1-4-1-quality/node-extension"/>
						</ul>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.4.2</h4></td>
					<td>
						<h4>Non-Clinical</h4>
						<ul type="square">
							<xsl:apply-templates select="m1-4-expert/m1-4-2-non-clinical/leaf | m1-4-expert/m1-4-2-non-clinical/node-extension"/>
						</ul>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.4.3</h4></td>
					<td>
						<h4>Clinical</h4>
						<ul type="square">
							<xsl:apply-templates select="m1-4-expert/m1-4-3-clinical/leaf | m1-4-expert/m1-4-3-clinical/node-extension"/>
						</ul>
					</td>
				</tr>
				<tr>
					<td valign="top"><h3>1.5</h3></td>
					<td>
						<h3>Specific Requirements for Different Types of Applications</h3>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.5.1</h4></td>
					<td>
						<h4>Information for Bibliographical Applications</h4>
						<ul type="square">
							<xsl:apply-templates select="m1-5-specific/m1-5-1-bibliographic/leaf | m1-5-specific/m1-5-1-bibliographic/node-extension"/>
						</ul>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.5.2</h4></td>
					<td>
						<h4>Information for Generic, 'Hybrid' or Bio-similar Applications</h4>
						<ul type="square">
							<xsl:apply-templates select="m1-5-specific/m1-5-2-generic-hybrid-bio-similar/leaf | m1-5-specific/m1-5-2-generic-hybrid-bio-similar/node-extension"/>
						</ul>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.5.3</h4></td>
					<td>
						<h4>(Extended) Data/Market Exclusivity</h4>
						<ul type="square">
							<xsl:apply-templates select="m1-5-specific/m1-5-3-data-market-exclusivity/leaf | m1-5-specific/m1-5-3-data-market-exclusivity/node-extension"/>
						</ul>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.5.4</h4></td>
					<td>
						<h4>Exceptional Circumstances</h4>
						<ul type="square">
							<xsl:apply-templates select="m1-5-specific/m1-5-4-exceptional-circumstances/leaf | m1-5-specific/m1-5-4-exceptional-circumstances/node-extension"/>
						</ul>
					</td>
				</tr>
				<xsl:if test="count(//procedure[./@type='decentralised']) = 0">
					<tr>
						<td valign="top"><h4>1.5.5</h4></td>
						<td>
							<h4>Conditional Marketing Authorisation</h4>
							<ul type="square">
								<xsl:apply-templates select="m1-5-specific/m1-5-5-conditional-ma/leaf | m1-5-specific/m1-5-5-conditional-ma/node-extension"/>
							</ul>
						</td>
					</tr>
				</xsl:if>
				<tr>
					<td valign="top"><h3>1.6</h3></td>
					<td>
						<h3>Environmental Risk Assessment</h3>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.6.1</h4></td>
					<td>
						<h4>Non-GMO</h4>
						<ul type="square">
							<xsl:apply-templates select="m1-6-environrisk/m1-6-1-non-gmo/leaf | m1-6-environrisk/m1-6-1-non-gmo/node-extension"/>
						</ul>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.6.2</h4></td>
					<td>
						<h4>GMO</h4>
						<ul type="square">
							<xsl:apply-templates select="m1-6-environrisk/m1-6-2-gmo/leaf | m1-6-environrisk/m1-6-2-gmo/node-extension"/>
						</ul>
					</td>
				</tr>
				<tr>
					<td valign="top"><h3>1.7</h3></td>
					<td>
						<h3>Information relating to Orphan Market Exclusivity</h3>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.7.1</h4></td>
					<td>
						<h4>Similarity</h4>
						<ul type="square">
							<xsl:apply-templates select="m1-7-orphan/m1-7-1-similarity/leaf | m1-7-orphan/m1-7-1-similarity/node-extension"/>
						</ul>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.7.2</h4></td>
					<td>
						<h4>Market Exclusivity</h4>
						<ul type="square">
							<xsl:apply-templates select="m1-7-orphan/m1-7-2-market-exclusivity/leaf | m1-7-orphan/m1-7-2-market-exclusivity/node-extension"/>
						</ul>
					</td>
				</tr>
				<tr>
					<td valign="top"><h3>1.8</h3></td>
					<td>
						<h3>Information relating to Pharmacovigilance</h3>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.8.1</h4></td>
					<td>
						<h4>Pharmacovigilance System</h4>
						<ul type="square">
							<xsl:apply-templates select="m1-8-pharmacovigilance/m1-8-1-pharmacovigilance-system/leaf | m1-8-pharmacovigilance/m1-8-1-pharmacovigilance-system/node-extension"/>
						</ul>
					</td>
				</tr>
				<tr>
					<td valign="top"><h4>1.8.2</h4></td>
					<td>
						<h4>Risk-management System</h4>
						<ul type="square">
							<xsl:apply-templates select="m1-8-pharmacovigilance/m1-8-2-risk-management-system/leaf | m1-8-pharmacovigilance/m1-8-2-risk-management-system/node-extension"/>
						</ul>
					</td>
				</tr>
				<tr>
					<td valign="top"><h3>1.9</h3></td>
					<td>
						<h3>Information relating to Clinical Trials</h3>
						<ul type="square">
							<xsl:apply-templates select="m1-9-clinical-trials/leaf | m1-9-clinical-trials/node-extension"/>
						</ul>
					</td>
				</tr>
				<tr>
					<td valign="top"><h3>1.10</h3></td>
					<td>
						<h3>Information relating to Paediatrics</h3>
						<ul type="square">
							<xsl:apply-templates select="m1-10-paediatrics/leaf | m1-10-paediatrics/node-extension"/>
						</ul>
					</td>
				</tr>
				<tr>
					<td valign="top"><h3></h3></td>
					<td>
						<h3>Responses to Questions</h3>
						<xsl:apply-templates select="m1-responses/specific"/>
					</td>
				</tr>
				<tr>
					<td valign="top"><h3></h3></td>
					<td>
						<h3>Additional Data</h3>
						<xsl:apply-templates select="m1-additional-data/specific"/>
					</td>
				</tr>
			</table>
		</center>
	</xsl:template>
	
</xsl:stylesheet>
