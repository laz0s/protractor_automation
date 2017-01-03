// Developers and Testers should add history regular Expressions at the end of the table
// so as not to change numbering of already added regular expressions

var historyMessage: RegExp[] = [
    /User '.*' created Procedure case/, // 0
    /Procedure case changed status to 'Awaiting Redaction Proposal'/, // 1
    /User '.*' rejected a redaction proposal dossier \[Anonymisation Report Missing\]/, // 2
    /Procedure Milestone 'Redaction Proposal Receipt' updated planned date to '' and actual date to '.*'/, // 3
    /User '.*' accepted a redaction proposal dossier/, // 4
    /Procedure case changed status to 'Pending Submission Acceptance'/, // 5
    /^User '.*' accepted dossier submission/, // 6
    /^Procedure case changed status to 'Pending Assignment'/, // 7
    /^User '.*' created a note/, // 8
    /^User '.*' modified a note/, // 9
    /^User '.*' deleted a note/, // 10
    /^.*, CREATED the note on .* at .*/, // 11
    /^.*, MODIFIED the note on .* at .*/, // 12
    /^.*, DELETED the note on .* at .*/, // 13
    /User '.*' changed field Procedure type from 'Initial MA' to 'Line Extension'/, // 14
    /User '.*' changed field Company name from 'Company Name' to 'editted Company Name'/, // 15
    /User '.*' changed field Product name from 'Product Name' to 'editted Product Name'/, // 16
    /User '.*' changed field Product status from 'Authorised' to 'Withdrawn'/, // 17
    /User '.*' changed field Product number from 'Product Number' to 'editted Product Number'/, // 18
    /User '.*' changed field Active Sustance name from 'Active Substance Name' to 'editted Active Substance Name'/, // 19
    /User '.*' changed field ATC code from 'ATC' to 'editted ATC'/, // 20
    /User '.*' changed field Paediatric from 'Yes' to 'No'/, // 21
    /User '.*' changed field Conditional Approval from 'Yes' to 'No'/, // 22
    /User '.*' changed field Exceptional Circumstances from 'Yes' to 'No'/, // 23
    /User '.*' changed field SME from 'Yes' to 'No'/, // 24
    /User '.*' changed field Orphan from 'Yes' to 'No'/, // 25
    /User '.*' changed field Article 58 from 'Yes' to 'No'/, // 26
    /User '.*' changed field Generic from 'Yes' to 'No'/, // 27
    /User '.*' changed field Biosimilar from 'Yes' to 'No'/, // 28
    /User '.*' changed field Legal Action from 'Yes' to 'No'/, // 29
    /User '.*' rejected a redaction proposal dossier \[Declaration Text Missing, Test Rejection Reason\]/, // 30
    /User '.*' assigned role 'Procedure case coordinator' to '.*'/, // 31
    /User '.*' assigned role 'Document Manager' to '.*'/, // 32
    /Procedure Milestone 'Assignment' updated planned date to '' and actual date to '.*'/, // 33
    /User '.*' assigned the document manager and coordinator/, // 34
    /Procedure case changed status to 'Validation In-Process'/, // 35
    /User '.*' confirmed the selected list of documents/, // 36
    /Document 'Clinical Overview' was assigned automatically to '.*'/, // 37
    /CDP Status was updated to 'Pending' for document '.*'/, // 38
    /PPD Status was updated to 'N\/A' for document '.*'/, // 39
    /User '.*' set justification link for document '.*' to 'https:\/\/www\.google\.com'/, // 40
    /Procedure Milestone 'Validation' updated planned date to '' and actual date to '.*'/, // 41
    /All documents have been validated/, // 42
    /Procedure case changed status to 'Assessment In-Process'/, // 43
    /Document 'Clinical Overview' was assigned automatically to '.*'/, // 44
    /User '.*' validated document '.*'/, // 45
    /User '.*' accepted a final proposal dossier/, // 46
    /Procedure case changed status to 'Awaiting Publishing Readiness'/, // 47
    /Procedure case changed status to 'Ready for Publishing'/, // 48
    /User '.*' assessed document '.*'/, // 49
    /Procedure case changed status to 'Published'/, // 50
    /Procedure case changed status to 'Publishing Underway'/, // 51
    /User '.*' changed field Actual CHMP Opinion Date from '' to '22\/11\/2016'/, // 52
    /Procedure Milestone 'EC decision' updated planned date to '28\/01\/2017'/, // 53
    /Procedure Milestone 'EPAR publication' updated planned date to '27\/02\/2017'/, // 54
    /Procedure Milestone 'Assignment' updated planned date to '10\/12\/2016' and actual date to ''/, // 55
    /Procedure Milestone 'Redaction Proposal Receipt' updated planned date to '05\/12\/2016' and actual date to ''/, // 56
    /Procedure Milestone 'Publish' updated planned date to '29\/03\/2017' and actual date to ''/, // 57
    /Procedure Milestone 'Final Redacted Document Package' updated planned date to '20\/02\/2017' and actual date to ''/, // 58
    /Procedure Milestone 'Reduction Conclusion' updated planned date to '21\/01\/2017' and actual date to ''/, // 59
    /Procedure Milestone 'Validation' updated planned date to '18\/12\/2016' and actual date to ''/, // 60
    /Procedure Milestone 'Assessment' updated planned date to '20\/01\/2017' and actual date to ''/, // 61
    /User '.*' changed field Actual Comission decision date from '' to '22\/11\/2016'/, // 62
    /Procedure Milestone 'Publish' updated planned date to '21\/01\/2017' and actual date to ''/, // 63
    /Procedure case changed status to 'Cancelled'/, // 64
    /User '.*' cancelled procedure level case with reason: Dummy Cancellation Reason/, // 65
    /User '.*' reopened procedure level case/, // 66
    /Procedure case changed status to 'Awaiting notice to be selected'/, // 67
    /User '.*' selected a notice to be published/ // 68
];

export = historyMessage;
