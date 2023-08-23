from pdfrw import PdfReader

def list_pdf_fields(pdf_path):
    pdf = PdfReader(pdf_path)
    field_names = []

    for page in pdf.pages:
        annotations = page.Annots
        if annotations:
            for annotation in annotations:
                field_name = annotation.get("/T")
                if field_name:
                    field_names.append(field_name)

    return field_names

pdf_path = 'dnd_char_sheet.pdf'
fields = list_pdf_fields(pdf_path)
for field in fields:
    print(field)