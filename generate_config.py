from difflib import unified_diff
import json
import os

##############################################################
## Note: the best way to configure the app is via the       ##
##       Ansible playbooks in the deploy/ subfolder.        ##
##############################################################
CACHE_FILE = "config.json"
TEMPLATE_FILE = "config.py.PROTO"
OUTPUT_FILE = "config.py"

questions = [
    {'key': 'ACCESS_KEY',
     'desc': 'Since there\'s no password for this app, ' + \
             'this is an optional value to pass in the ' + \
             'querystring to access the application.',
     'default': ''},
    {'key': 'API_KEY',
     'desc': 'Your Google Maps API key?'},
    {'key': 'DB_NAME',
     'desc': 'PostgreSQL database name?'},
    {'key': 'DB_USER',
     'desc': 'PostgreSQL user name?'},
    {'key': 'LIVERELOAD_URL',
     'desc': 'Optional URL to the LiveReload script?',
     'default': '//localhost:35729/livereload.js'},
    {'key': 'CONFIG_TO_USE',
     'desc': 'Which mode to put the Flask server-side code in?',
     'options': ['Debug', 'Test', 'Prod'],
     'default': 1}
]

class ConfigHopper:
    def __init__(self):
        self.answers = os.path.exists(CACHE_FILE) and \
                         json.load(open(CACHE_FILE, 'rb')) or \
                         {}

    def showIntro(self):
        print "Please answer the following questions to populate " + \
              "your %s..." % (OUTPUT_FILE,)
        print

    def buildDefault(self, default):
        if default is None:
            return ''
        elif type(default) == type(0):
            return ' [%d]' % (default,)
        else:
            return " ['%s']" % (default,)

    def prompt(self, question):
        default = None
        key = question['key']
        if key in self.answers:
            default = self.answers[key]
        elif 'default' in question:
            default = question['default']

        if 'options' in question:
            maxval = 0
            print question['desc']
            print
            for index, o in enumerate(question['options']):
                maxval = index + 1
                print "  %d. %s" % (maxval, o)
            print
            while 1:
                prompt = "Which option do you choose?%s " % \
                         (self.buildDefault(default),)
                response = raw_input(prompt).strip()
                if response == '' and default is not None:
                    response = default
                try:
                    response = int(response)
                    if response < 1 or response > maxval:
                        raise ValueError
                    self.answers[key] = question['options'][response - 1]
                    break
                except:
                    print "Invalid entry. Please choose a number from the " + \
                          "options list."
        else:
            prompt = "%s%s " % (question['desc'], self.buildDefault(default))
            response = raw_input(prompt).strip()
            self.answers[key] = response == '' and default or response

    def overwriteOkay(self):
        if os.path.exists(OUTPUT_FILE):
            old = open(OUTPUT_FILE, 'rb').readlines()
            new = [i + '\n' \
                   for i in \
                   (open(TEMPLATE_FILE, 'rb').read() % self.answers).split('\n')]
            if old == new:
                print "No changes to configuration... skipping..."
                return False
            print
            print "Please review the following changes between the current and " + \
                  "proposed versions:"
            print
            for line in unified_diff(old,
                                     new,
                                     fromfile='CURRENT',
                                     tofile='PROPOSED'):
                print line,
            response = raw_input("\nAre you sure you want to " + \
                                 "overwrite the existing %s (y/n)? [n] " % \
                                 (OUTPUT_FILE,))
            return response.strip().lower()[:1] == 'y'
        else:
            return True

    def writeToFile(self):
        tmpl = open(TEMPLATE_FILE, 'rb').read()
        out = open(OUTPUT_FILE, 'wb')
        out.write(tmpl % self.answers)
        out.close()
        print "Configuration changes written to %s." % (OUTPUT_FILE,)
        # cache values for next run
        json.dump(self.answers, open(CACHE_FILE, 'wb'), indent=2)

if __name__ == '__main__':
    c = ConfigHopper()
    c.showIntro()
    for q in questions:
        c.prompt(q)
    if c.overwriteOkay():
        c.writeToFile()
    else:
        print "No changes were made to %s." % (OUTPUT_FILE,)

