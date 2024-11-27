from vncdotool import api
import time
import random

# Connect to the VNC server
client = api.connect('172.16.4.20', password='')

keyboard = ['right', 'up', 'left', 'down']
rand_keyboard = 0
rand_delay = 0
scroll_direction = 0

while True:
    # Send random key presses for navigation on the VM
    client.keyPress(keyboard[rand_keyboard])
    rand_delay += 1

    # Simulate scroll action on the VM after every 5 actions
    if rand_delay == 5:
        scroll_direction = random.randint(0, 1)
        if scroll_direction == 0:
            client.keyPress('down')
        else:
            client.keyPress('up')

    # Reset rand_delay and choose a new random key direction
    if rand_delay > 5:
        rand_keyboard = random.randint(0, 3)
        rand_delay = 0

    # Delay for a random period
    time.sleep(random.randint(0, 500) / 1000)

client.disconnect()
