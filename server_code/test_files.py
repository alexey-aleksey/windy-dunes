import anvil.server

import stanza

import json
import codecs

from glob import glob

from pathlib import Path

from stanza.pipeline.core import DownloadMethod

# This is a server module. It runs on the Anvil server,
# rather than in the user's browser.
#
# To allow anvil.server.call() to call functions here, we mark
# them with @anvil.server.callable.
# Here is an example - you can replace it with your own:
#
# @anvil.server.callable
# def say_hello(name):
#   print("Hello, " + name + "!")
#   return 42
#

@anvil.server.callable
def stanza_phrases ():
  files = glob('_/theme/phrases/*.aac')
  files.extend(glob('_/theme/phrases/*.m4a'))
  nlp = stanza.Pipeline('uk', download_method=DownloadMethod.REUSE_RESOURCES)
  
  for file in files:
    str = Path(file).stem
    doc_name = str + ".json"
    doc = nlp(str)
    dict = doc.to_dict()
    with codecs.open(doc_name, 'w', encoding='utf-8') as f:
      json.dump(dict, f, ensure_ascii=False)
