from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.spinner import Spinner
from kivy.uix.scrollview import ScrollView

from get_time_based_on_speed import get_time_based_on_speed_outside_call
from get_speed_per_hour import get_speed_per_hour_outside_call

class MyApp(App):
    def build(self):
        root = ScrollView()
        self.layout = BoxLayout(orientation='vertical', padding=10, spacing=10, size_hint_y=None)
        self.layout.bind(minimum_height=self.layout.setter('height'))

        # Shared dropdown (spinner)
        dropdown_horizontal_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=44)
        shared_unit_of_measurement = Label(text="Choose the unit of measurement for the computations:", size_hint_y=None, height=44)
        self.unit = Spinner(
            text='km',
            values=('km', 'miles'),
            size_hint_y=None,
            height=44
        )
        dropdown_horizontal_layout.add_widget(shared_unit_of_measurement)
        dropdown_horizontal_layout.add_widget(self.unit)

        # Shared integer input with plus and minus
        int_input_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=44)
        shared_int_input_label = Label(text="Enter a distance of integer value:", size_hint=(0.32, None), height=44)
        self.distance = TextInput(hint_text="0", input_filter='int', halign="center", size_hint=(0.1, None), height=44)
        self.distance.text = "4"
        btn_plus = Button(text="+", size_hint=(0.1, None), height=44)
        btn_plus.bind(on_press=self.increment_integer)
        btn_minus = Button(text="-", size_hint=(0.1, None), height=44)
        btn_minus.bind(on_press=self.decrement_integer)
        int_input_layout.add_widget(shared_int_input_label)
        int_input_layout.add_widget(self.distance)
        int_input_layout.add_widget(btn_plus)
        int_input_layout.add_widget(btn_minus)

        # Script 1 block
        script_one_block = BoxLayout(orientation='vertical', size_hint_y=None, padding=10, spacing=10)
        script_one_block.bind(minimum_height=script_one_block.setter('height'))
        script_one_info_label = Label(text="Here you can compute the needed speed per hour to obtain the inputted time", size_hint_y=None, height=44)
        script_one_horizontal_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=44)
        self.script_one_input = TextInput(hint_text='Enter time to obtain...', size_hint=(0.5, None), height=44)
        self.script_one_input.text = "22.00"
        btn1 = Button(text='Compute needed speed', size_hint=(0.5, None), height=44)
        btn1.bind(on_press=self.call_script_one)
        self.label_one = Label(text='Needed speed will appear here', size_hint_y=None, height=50)
        script_one_horizontal_layout.add_widget(self.script_one_input)
        script_one_horizontal_layout.add_widget(btn1)
        script_one_block.add_widget(script_one_info_label)
        script_one_block.add_widget(script_one_horizontal_layout)
        script_one_block.add_widget(self.label_one)

        # Script 2 block
        script_two_block = BoxLayout(orientation='vertical', size_hint_y=None, padding=10, spacing=10)
        script_two_block.bind(minimum_height=script_two_block.setter('height'))
        script_two_info_label = Label(text="Here you can compute the time obtained based on the inputted speed", size_hint_y=None, height=44)
        script_two_horizontal_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=44)
        self.script_two_input = TextInput(hint_text='Enter speed per hour...', input_filter='float', size_hint=(0.4, None), height=44)
        self.script_two_input.text = "11.0"
        btn_plus_float = Button(text="+", size_hint=(0.1, None), height=44)
        btn_plus_float.bind(on_press=self.increment_float)
        btn_minus_float = Button(text="-", size_hint=(0.1, None), height=44)
        btn_minus_float.bind(on_press=self.decrement_float)
        btn2 = Button(text='Compute time obtained', size_hint=(0.4, None), height=44)
        btn2.bind(on_press=self.call_script_two)
        self.label_two = Label(text='Time to cover distance will appear here...', size_hint_y=None, height=50)
        script_two_horizontal_layout.add_widget(self.script_two_input)
        script_two_horizontal_layout.add_widget(btn_plus_float)
        script_two_horizontal_layout.add_widget(btn_minus_float)
        script_two_horizontal_layout.add_widget(btn2)
        script_two_block.add_widget(script_two_info_label)
        script_two_block.add_widget(script_two_horizontal_layout)
        script_two_block.add_widget(self.label_two)

        # Add all widgets
        self.layout.add_widget(dropdown_horizontal_layout)
        self.layout.add_widget(int_input_layout)
        self.layout.add_widget(script_one_block)
        self.layout.add_widget(script_two_block)

        root.add_widget(self.layout)
        return root

    def call_script_one(self, instance):
        measurement_unit = self.unit.text
        distance = int(self.distance.text)
        specific_input = self.script_one_input.text
        try:
            result = get_speed_per_hour_outside_call(specific_input, distance, measurement_unit)
            self.label_one.text = result
        except Exception as e:
            self.label_one.text = f"Error: {e}"

    def call_script_two(self, instance):
        measurement_unit = self.unit.text
        distance = int(self.distance.text)
        specific_input = float(self.script_two_input.text)
        try:
            result = get_time_based_on_speed_outside_call(specific_input, distance, measurement_unit)
            self.label_two.text = result
        except Exception as e:
            self.label_two.text = f"Error: {e}"

    def increment_integer(self, instance):
        try:
            current_value = int(self.distance.text)
            self.distance.text = str(current_value + 1)
        except ValueError:
            self.distance.text = "4"

    def decrement_integer(self, instance):
        try:
            current_value = int(self.distance.text)
            self.distance.text = str(current_value - 1)
        except ValueError:
            self.distance.text = "4"

    def decrement_float(self, instance):
        try:
            current_value = float(self.script_two_input.text)
            self.script_two_input.text = str(round(current_value - 0.1, 1))
        except ValueError:
            self.script_two_input.text = "11.0"

    def increment_float(self, instance):
        try:
            current_value = float(self.script_two_input.text)
            self.script_two_input.text = str(round(current_value + 0.1, 1))
        except ValueError:
            self.script_two_input.text = "11.0"

if __name__ == '__main__':
    MyApp().run()
