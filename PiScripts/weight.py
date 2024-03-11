import RPi.GPIO as GPIO
from hx711 import HX711

# Setup the correct pin numbers here
DT_PIN = 5 
SCK_PIN = 6
R_DIODE_PIN = 0 # Red diode pin
G_DIODE_PIN = 0 # Green diode pin
SWITCH_PIN = 0 # Button(Switch) pin

def my_callback(channel):
   print("You pressed the button")

def reset():
    GPIO.cleanup()

# Setting up pins
try:
    reset()
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(R_DIODE_PIN, GPIO.OUT)
    GPIO.setup(G_DIODE_PIN, GPIO.OUT)
    GPIO.setup(SWITCH_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.add_event_detect(SWITCH_PIN, GPIO.FALLING, callback=my_callback) 

finally:
    GPIO.cleanup()

try:
    hx = HX711(dout_pin=DT_PIN, pd_sck_pin=SCK_PIN)
    print("Please don't place anything on the weight...")
    hx.zero() #reset the hx711
    initial_reading = hx.get_raw_data_mean() #get value without weight
    input("Put a known weight on the weight and press enter: ")
    cali_reading =hx.get_data_mean()
    known_weight = input("How much weight did you put on in gr: ")
    hx.set_scale_ratio(cali_reading/float(known_weight)) #set the ratio to the value change for each gram
    input ("calibration done, press Enter to read weight values: ")
    while True:
       print(hx.get_weight_mean(20), "g") # print the value in gram

finally:
    GPIO.cleanup()
