# passengerCOVIDscan
Highly secured AI system to check the safety of the passenger
It is developed to be a secured AI tool with the purpose to help passenger safty check with COVID-19 dectection, PPE safety check amid this COVID-19 pandemics.

#Installing

Now Let's Install Virtualenv with pip. There are other ways also to install virtualenv but I prefer this.*
$ easy_install pip
Next step is to install the virtualenv package:

$ pip install virtualenv

Great you have installed virtualenv your machine.

Cloning the project. Type this command in terminal to clone the repo.

$ git clone https://github.com/pradip026/passengerCOVIDscan.git

Create an Environment with virtualenv

$ cd passengerCOVIDscan

To create the environment with virtualenv:

$ virtualenv venv  #see alternative if you are using other than LINUX/UNIX.

After creating virtual environment, it's time to activate it. Type this command

$ source venv/bin/activate

To check wether the cloning process done corectly type  ls,and it'll look like this.

ls

app     manage.py   passenger    requirements.txt    venv

$ pip install -r requirements.txt

Now, start the deployment server

$ python manage.py runserver

If everything worked fine >>
Congratulations, you setup the passengercovidscan project in your pc.
