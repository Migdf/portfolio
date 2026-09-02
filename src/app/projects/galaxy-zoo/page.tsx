import ProjectPage from "../../components/ProjectPage";

export default function GalaxyZooPage() {
  return (
    <ProjectPage
      title="Galaxy Classification with Deep Learning"
      subtitle="Using convolutional neural networks to classify galaxy morphology from astronomical image data. This is a Machine Learning for Physics (PHYS 450) class guided project by Professor Neubauer at UIUC."
      image="/images/galaxy-project.png"

      technologies={[
        "Python",
        "PyTorch",
        "Computer Vision",
        "Deep Learning",
        "CNN",
      ]}

      links={[
        {
          label: "View GitHub",
          href: "https://github.com/Migdf/PHYS-450/blob/main/Project_01_GalaxyZoo.ipynb",
        },
      ]}

      sections={[
        {
          title: "The Problem",
          blocks: [
            {
              type: "text",
              content:
                "Because modern astronomical surveys collect enormous numbers of galaxy images, manually analyzing these images is difficult and time-consuming. Machine learning provides a way to automatically identify visual patterns and galaxy morphology.",
            },
          ],
        },

        {
          title: "Approach",
          blocks: [
            {
              type: "text",
              content:
                "I used a convolutional neural network to learn visual features directly from galaxy images provided by Galaxy Zoo. The model processes images through convolutional layers that identify increasingly complex structures before producing predictions about galaxy morphology.",
            },
          ],
        },

        {
          title: "Model",
          blocks: [
            {
              type: "text",
              content:
                "The model was implemented using PyTorch and trained on labeled astronomical image data. I experimented with preprocessing, model architecture, training parameters, and evaluation methods to improve classification performance.",
            },
          ],
        },

        {
          title: "Results",

          blocks: [
            {
              type: "text",
              content:
                "The model was evaluated using validation accuracy and visual inspection of predicted galaxy classes.",
            },

            {
              type: "image",
              image: {
                src: "/images/gz_training_loss.png",
                caption: "Training loss across epochs.",
              },
            },

            {
              type: "image",
              image: {
                src: "/images/gz_training_accuracy.png",
                caption: "Training and validation accuracy across epochs.",
              },
            },

            {
              type: "code",
              code: `class GalaxyCNN(nn.Module):
    def __init__(self, num_classes):
        super().__init__()

        self.features = nn.Sequential(
            nn.Conv2d(3, 16, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(16, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2)
        )

        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(32 * 16 * 16, 64),
            nn.ReLU(),
            nn.Linear(64, num_classes)
        )`,
            },

            {
              type: "image",
              image: {
                src: "/images/gz_prediction_results.png",
                alt: "Example galaxy predictions",
                caption: "Example predictions produced by the trained CNN.",
              },
            },
          ],
        },

        {
          title: "What I Learned",
          blocks: [
            {
              type: "text",
              content: `This project gave me practical experience building and evaluating deep learning models for real scientific data. I learned about the importance of preprocessing and understanding the data when choosing the right type of model and deciding how to approach the problem.`,
            },
          ],
        },
      ]}
    />
  );
}