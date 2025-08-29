import stanza

import json
import codecs

from glob import glob

from pathlib import Path

files = glob('*.aac')
files.extend(glob('*.m4a'))

from stanza.pipeline.core import DownloadMethod

nlp = stanza.Pipeline('uk', download_method=DownloadMethod.REUSE_RESOURCES)

for file in files:
    str = Path(file).stem
    doc_name = str + ".json"
    doc = nlp(str)
    dict = doc.to_dict()
    with codecs.open(doc_name, 'w', encoding='utf-8') as f:
        json.dump(dict, f, ensure_ascii=False)
