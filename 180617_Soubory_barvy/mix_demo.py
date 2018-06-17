from IPython.display import display
from ipywidgets import interact, FloatSlider

class RGBCircle:
    def __init__(self, red, green, blue):
        self.color = red, green, blue

    def _repr_svg_(self):
        return f"""
            <svg viewBox="0 0 32 32" width="512" height="512">
                <circle cx="14" cy="14" r="12"
                 fill="rgb{self.color}"
                 stroke="black" stroke-width="1"
                ></circle>
            </svg>"
        """
        
def mix_demo(rgb_colors):
    def light_circle(**intensities):
        color = [0, 0, 0]
        for name, rgb in rgb_colors.items():
            for i, component in enumerate(rgb):
                color[i] += component * intensities[name]
        return RGBCircle(*color)

    widgets = {
        name: FloatSlider(
            min=0.0, max=1.0, step=0.01, value=0,
            description=f'<span style="color:rgb{rgb}">{name}</span>',
        )
        for name, rgb in rgb_colors.items()
    }

    interact(light_circle, **widgets)
