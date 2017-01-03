<!--
In the eCTD File Organisation: "util/dtd/eu-envelope.mod"

Version 1.3
May 2008

Contributors:
   AFSSAPS (Aziz Diop)
   EMEA (Laurent Desqueper, Jean-Francois Halleux, Carrasco Benitez)
   MEB (C.A. van Belkum)

-->

<!-- ................................................................... -->
<!ELEMENT eu-envelope (
	envelope+
)>

<!ELEMENT envelope (
	application,
	applicant, 
	agency, 
	atc*,
	submission,
	procedure,
	invented-name+,
	inn*,
	sequence,
	related-sequence*,
	submission-description
)>

<!-- ................................................................... -->
<!ELEMENT application 		( number* )>
<!ELEMENT applicant   		( #PCDATA )>
<!ELEMENT agency			   	EMPTY>
<!ELEMENT atc			      ( #PCDATA )>
<!ELEMENT submission   		EMPTY  >
<!ELEMENT procedure    		EMPTY  >
<!ELEMENT invented-name 	( #PCDATA )>
<!ELEMENT inn				   ( #PCDATA )>
<!ELEMENT sequence			( #PCDATA )>
<!ELEMENT related-sequence ( #PCDATA )>
<!ELEMENT submission-description 	( #PCDATA )>
<!ELEMENT number 		      ( #PCDATA )>

<!-- ................................................................... -->
<!ATTLIST agency
code ( AT-AGES | BE-FAMHP | BG-BDA | BG-NVS | CY-VS | CZ-SUKL | CZ-USKVBL | DE-BFARM | DE-BVL | DE-PEI | DK-DKMA | EE-SAM | EL-EOF | ES-AGEMED | FI-NAM | FR-AFSSAPS | FR-ANMV | HU-IVMP | HU-OGYI | IE-IMB | IE-DAFF | IS-IMCA | IT-AIFA | IT-LMV | IT-SPV | LI-LLV | LT-SMCA | LT-VVPI | LT-VMVT | LU-MINSANT | LV-ZVA | MT-MRU | MT-MEDAUTH | NL-MEB | NO-NOMA | PL-URPL | PT-DGV | PT-INFARMED | RO-ANM | SE-MPA | SI-JAZMP | SK-SIDC | SK-USKVBL | UK-MHRA | UK-VMD | EU-EMEA ) #REQUIRED>

<!-- ................................................................... -->
<!ATTLIST procedure
 type (
   centralised
 | national
 | mutual-recognition
 | decentralised
 ) #REQUIRED
>

<!-- ................................................................... -->
<!ATTLIST submission
 type ( initial-maa | supplemental-info | fum | specific-obligation | var-type1a | var-type1b | var-type2 | extension | psur | renewal | asmf | referral | annual-reassessment | usr | article-58 | notification-61-3 | transfer-ma | corrigendum | lifting-suspension | withdrawal | paed-article-29 | var-nat | reformat) #REQUIRED
>

<!-- ................................................................... -->
<!ENTITY % env-countries "(at|be|bg|cy|cz|de|dk|ee|el|emea|es|fi|fr|hu|ie|is|it|li|lt|lu|lv|mt|nl|no|pl|pt|ro|se|si|sk|uk)">

<!-- ................................................................... -->
<!ATTLIST envelope country %env-countries; #REQUIRED >

<!-- +++ --> 