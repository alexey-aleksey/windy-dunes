import anvil.files
from anvil.files import data_files
import anvil.google.auth, anvil.google.drive, anvil.google.mail
from anvil.google.drive import app_files
import anvil.tables as tables
import anvil.tables.query as q
from anvil.tables import app_tables
import anvil.users
import anvil.server

import stanza

import json
import codecs

import anvil.media
import anvil.files

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
    # with codecs.open(doc_name, 'w', encoding='utf-8') as f:
    #   json.dump(dict, f, ensure_ascii=False)
    save_json_to_app_files_classic(dict, doc_name)

def save_json_to_app_files_classic(data, filename="data.json"):
  # ensure_ascii=False → outputs actual UTF-8 characters (not \u escapes)
  # indent=2 for pretty printing (optional)
  json_string = json.dumps(data, ensure_ascii=False, indent=2)

  # Important: explicitly encode as UTF-8 bytes
  json_bytes = json_string.encode('utf-8')

  media_object = anvil.media.BytesMedia(
    json_bytes,
    content_type="application/json",
    filename=filename
  )
  anvil.files.app_files[filename] = media_object