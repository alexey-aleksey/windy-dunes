from ._anvil_designer import control_panelTemplate
from anvil import *
import anvil.google.auth, anvil.google.drive
from anvil.google.drive import app_files
import anvil.tables as tables
import anvil.tables.query as q
from anvil.tables import app_tables
import anvil.users
import anvil.server


class control_panel(control_panelTemplate):
  def __init__(self, **properties):
    # Set Form properties and Data Bindings.
    self.init_components(**properties)

    # Any code you write here will run before the form opens.
    anvil.users.login_with_form()

  def button_admin_click(self, **event_args):
    """This method is called when the button is clicked"""
    user = anvil.users.get_user()

    if user['role'] == 'admin':
     open_form('admin_form')
    pass
