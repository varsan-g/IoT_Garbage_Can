import RPi.GPIO as GPIO
from hx711 import HX711
from websocket import create_connection

# Set up the correct pin numbers here
DT_PIN = 5 
SCK_PIN = 6
R_DIODE_PIN = 12 # Red diode pin
G_DIODE_PIN = 18 # Green diode pin
SWITCH_PIN = 0 # Button(Switch) pin

weight_before_reset = 0
weight_reset_threshold = 500

def my_callback(channel):
   print("You pressed the button")

def reset():
    GPIO.cleanup()

try:
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(R_DIODE_PIN, GPIO.OUT)
    GPIO.setup(G_DIODE_PIN, GPIO.OUT)
    GPIO.setup(SWITCH_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.add_event_detect(SWITCH_PIN, GPIO.FALLING, callback=my_callback) 
    hx = HX711(dout_pin=DT_PIN, pd_sck_pin=SCK_PIN)
    print("Please don't place anything on the weight...")
    hx.zero() #reset the hx711
    initial_reading = hx.get_raw_data_mean() #get value without weight
    ws = create_connection ("ws://10.176.69.101:8080")
    ws.send("connected")
    input("Put a known weight on the weight and press enter: ")
    cali_reading =hx.get_data_mean()
    known_weight = input("How much weight did you put on in gr: ")
    hx.set_scale_ratio(cali_reading/float(known_weight)) #set the ratio to the value change for each gram
    input ("calibration done, press Enter to read weight values: ")
    while True:
       calculated_weight = hx.get_weight_mean(20)
       while calculated_weight >= weight_reset_threshold:
           if calculated_weight < 50:
              GPIO.output(R_DIODE_PIN, GPIO.HIGH)
              GPIO.output(G_DIODE_PIN, GPIO.LOW)
              print(calculated_weight)
              ws.send(str(calculated_weight))
              break
           else:
               break
           
    #    if calculated_weight > 1000:
    #         GPIO.output(R_DIODE_PIN, GPIO.HIGH)
    #         GPIO.output(G_DIODE_PIN, GPIO.LOW)
    #         print(calculated_weight)
    #         ws.send(str(calculated_weight))
    #    else:
    #         GPIO.output(R_DIODE_PIN, GPIO.LOW)
    #         GPIO.output(G_DIODE_PIN, GPIO.HIGH) 
finally:
    GPIO.cleanup()
    #ws.close()
