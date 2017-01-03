<!--
In the eCTD File Organisation: "util/dtd/eu-envelope.mod"

Version 1.4

February 2009

Contributors:
   ANSM (Aziz Diop)
   EMA (Laurent Desqueper)
   MEB (C.A. van Belkum)

Version 2.0
February 2013

Contributors:
	EMA (Antonios Yfantis)

-->

<!-- ................................................................... -->
<!ELEMENT eu-envelope (
	envelope+
)>

<!ELEMENT envelope (
	submission,
	applicant, 
	agency, 
	procedure,
	invented-name+,
	inn*,
	sequence,
	related-sequence*,
	submission-description
)>

<!-- ................................................................... -->
<!ELEMENT submission   		( number?, tracking )  >
<!ELEMENT tracking 		( number+ )>
<!ELEMENT number 		      ( #PCDATA )>
<!ELEMENT applicant   		( #PCDATA )>
<!ELEMENT agency			   	EMPTY>
<!ELEMENT procedure    		EMPTY  >
<!ELEMENT invented-name 	( #PCDATA )>
<!ELEMENT inn				   ( #PCDATA )>
<!ELEMENT sequence			( #PCDATA )>
<!ELEMENT related-sequence ( #PCDATA )>
<!ELEMENT submission-description 	( #PCDATA )>

<!-- ................................................................... -->
<!ATTLIST submission
 type ( initial-maa | var-type1a | var-type1b | var-type2 | var-nat | extension | psur | renewal | supplemental-info | fum | specific-obligation | asmf | pmf | referral | annual-reassessment | usr | paed-article-29 | paed-article-46 | article-58 | notification-61-3 | transfer-ma | corrigendum | lifting-suspension | withdrawal | reformat | rmp) #REQUIRED
 mode ( single | grouping | worksharing ) #IMPLIED
>

<!-- ................................................................... -->
<!ATTLIST agency
code ( AT-AGES | BE-FAMHP | BG-BDA | CY-PHS | CZ-SUKL | DE-BFARM | DE-PEI | DK-DKMA | EE-SAM | EL-EOF | ES-AEMPS | FI-FIMEA | FR-ANSM | HR-HALMED | HU-OGYI | IE-IMB | IS-IMCA | IT-AIFA | LI-LLV | LT-SMCA | LU-MINSANT | LV-ZVA | MT-MEDAUTH | NL-MEB | NO-NOMA | PL-URPL | PT-INFARMED | RO-ANMMD | SE-MPA | SI-JAZMP | SK-SIDC | UK-MHRA | EU-EMA ) #REQUIRED>

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
<!ENTITY % env-countries "(at|be|bg|cy|cz|de|dk|ee|el|ema|es|fi|fr|hr|hu|ie|is|it|li|lt|lu|lv|mt|nl|no|pl|pt|ro|se|si|sk|uk)">

<!-- ................................................................... -->
<!ATTLIST envelope country %env-countries; #REQUIRED >
<!-- +++ --> 