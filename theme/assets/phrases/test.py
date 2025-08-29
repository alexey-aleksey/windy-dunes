import stanza

import json
import codecs

# stanza.download('en')

from stanza.pipeline.core import DownloadMethod

nlp = stanza.Pipeline('uk', download_method=DownloadMethod.REUSE_RESOURCES)

# nlp = stanza.Pipeline('uk')

doc = nlp("Я ж забула вимкнути праску.")

dict = doc.to_dict()

with codecs.open('your_file.txt', 'w', encoding='utf-8') as f:
    json.dump(dict, f, ensure_ascii=False)
