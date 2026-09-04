import ProjectPage from "../../components/ProjectPage";

export default function GalaxyZooPage() {
  return (
    <ProjectPage
      title="Galaxy Classification with Deep Learning"
      subtitle="Building a convolutional neural network to classify galaxy morphology from Galaxy Zoo astronomical imagery and citizen-science labels."
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
          label: "View Source Code",
          href: "https://github.com/Migdf/PHYS-450/blob/main/Project_01_GalaxyZoo.ipynb",
        },
      ]}

      sections={[
        {
          title: "Project Overview",
          blocks: [
            {
              type: "text",
              content:
                "Modern sky surveys can produce far more galaxy images than astronomers can realistically classify by hand. Galaxy morphology is scientifically useful because visible structures such as disks, bulges, spiral arms, bars, and irregular features provide information about a galaxy's formation and evolutionary history.\n\nGalaxy Zoo helps address this problem through citizen science, collecting large numbers of human classifications for astronomical images. This project uses those labeled images to train a convolutional neural network that learns morphological patterns directly from image pixels and predicts a galaxy's class.",
            },
          ],
        },

        {
          title: "Data & Label Preparation",
          blocks: [
            {
              type: "text",
              content:
                "One of the first challenges was that Galaxy Zoo does not provide a simple single-category label for every image. The training data instead contained 37 response columns corresponding to branches of the Galaxy Zoo decision tree, with each value representing the classification likelihood of a particular morphological response.",
            },

            {
              type: "text",
              content:
                "To convert this into a standard supervised classification problem, the highest-probability response for each galaxy was selected as its target class. After matching the available labels with the image dataset, 61,578 usable galaxies remained. Although the original table contained 37 possible response columns, only five responses appeared as the highest-probability label for at least one usable sample, resulting in a five-class classification problem.",
            },

            {
              type: "text",
              content:
                "This was an important modeling choice because the original Galaxy Zoo labels are probabilistic and hierarchical rather than simple flat categories. Reducing each galaxy to its highest-probability response sacrifices some of that original richness, but creates a clear target for demonstrating CNN-based image classification.",
            },

            {
              type: "text",
              content:
                "Each image was converted to RGB, resized to 64 × 64 pixels, and normalized from integer pixel values between 0 and 255 to floating-point values between 0 and 1. The image dimensions were then rearranged into the channel-first format expected by PyTorch.",
            },

            {
              type: "text",
              content:
                "A stratified 60/40 train-test split preserved the relative class distribution across both subsets. This produced 36,946 training images and 24,632 held-out test images, with batches of 64 images used during training.",
            },
          ],
        },

        {
          title: "CNN Model & Training",
          blocks: [
            {
              type: "text",
              content:
                "A convolutional neural network is well suited to this task because galaxy morphology is fundamentally spatial. Rather than treating each pixel as an unrelated input, convolutional layers learn local visual patterns that can appear in different parts of an image.",
            },

            {
              type: "text",
              content:
                "The network begins with three RGB input channels and passes them through a convolutional layer that produces 16 feature maps. A second convolution increases the representation to 32 feature maps. Both layers use 3 × 3 kernels with padding, followed by ReLU activation and 2 × 2 max pooling.",
            },

            {
              type: "text",
              content:
                "The 3 × 3 filters move across each galaxy image and combine nearby pixel values to detect local structure. During training, the filter values change so that the network learns features useful for separating the five target classes. Earlier layers can respond to relatively simple patterns such as edges, brightness changes, and color differences, while later layers combine those responses into higher-level representations of morphology.",
            },

            {
              type: "text",
              content:
                "ReLU introduces nonlinearity by keeping positive activations and setting negative ones to zero. Max pooling then keeps the strongest activation within each 2 × 2 region, reducing the size of the representation while retaining prominent learned features.",
            },

            {
              type: "text",
              content:
                "After the two pooling operations, the spatial dimensions shrink from 64 × 64 to 32 × 32 and then to 16 × 16. The resulting 32 × 16 × 16 representation contains 8,192 values when flattened. Those values pass through a fully connected layer with 64 units before being mapped to five output scores, one for each galaxy class.",
            },

            {
              type: "text",
              content:
                "Training used cross-entropy loss, which penalizes the model when the correct class receives a relatively low score. During backpropagation, PyTorch calculates how each parameter contributed to the prediction error, and the Adam optimizer updates those parameters using a learning rate of 0.001.\n\nThe model was trained for 10 epochs, gradually adjusting both its convolutional filters and fully connected layers to better map galaxy images to their target classes.",
            },
          ],
        },

        {
          title: "Challenges & Decisions",
          blocks: [
            {
              type: "text",
              content:
                "The biggest challenge was deciding how to translate the original Galaxy Zoo data into a conventional machine-learning task. The source labels follow a branching morphology decision tree rather than a flat classification structure, so using the maximum-probability response created a simpler problem while inevitably discarding some information contained in the full label distribution.",
            },

            {
              type: "text",
              content:
                "Image resolution was another design choice. Resizing every image to 64 × 64 provided a consistent input size and kept training manageable while preserving the overall visual structure needed for morphology classification.",
            },

            {
              type: "text",
              content:
                "The model architecture was intentionally kept relatively small, with only two convolutional layers. The goal was to understand the complete deep-learning pipeline and determine whether a compact CNN could learn useful structure before introducing substantially more model complexity.",
            },
          ],
        },

        {
          title: "Results",
          blocks: [
            {
              type: "text",
              content:
                "The model improved steadily across all 10 training epochs. Training loss decreased from 0.9390 in the first epoch to 0.5487 by the tenth, while training accuracy increased from 62.04% to 78.42%.",
            },

            {
              type: "text",
              content:
                "The improvement continued throughout training rather than occurring only during the first few epochs. Accuracy passed 70% during epoch 5 and kept increasing through the final epoch, showing that even a compact two-convolution architecture could learn useful visual structure from the galaxy images.",
            },

            {
              type: "text",
              content:
                "Held-out test images were also inspected qualitatively by displaying the true and predicted classes side by side. This provided a direct way to examine where the model agreed with the Galaxy Zoo labels and where visually ambiguous galaxies still led to incorrect predictions.",
            },

            {
              type: "image",
              image: {
                src: "/images/gz_training_loss.png",
                alt: "Galaxy CNN training loss across 10 epochs",
                caption:
                  "Training loss decreased from 0.9390 to 0.5487 across 10 epochs.",
              },
            },

            {
              type: "image",
              image: {
                src: "/images/gz_training_accuracy.png",
                alt: "Galaxy CNN training accuracy across 10 epochs",
                caption:
                  "Training accuracy increased from 62.04% to 78.42% across 10 epochs.",
              },
            },

            {
              type: "image",
              image: {
                src: "/images/gz_prediction_results.png",
                alt: "Example Galaxy Zoo CNN predictions compared with true labels",
                caption:
                  "Example predictions on held-out galaxy images, showing the true and predicted morphology labels.",
              },
            },
          ],
        },

        {
          title: "What I Learned",
          blocks: [
            {
              type: "text",
              content:
                "This project reinforced that building a useful neural network starts well before defining the model architecture. Understanding what the labels actually represent, deciding how to translate a scientific dataset into a learning objective, and choosing an appropriate train-test structure were just as important as constructing the CNN itself.",
            },

            {
              type: "text",
              content:
                "It also made concepts such as convolution, nonlinear activations, pooling, cross-entropy loss, and gradient-based optimization much more concrete. Rather than treating a CNN as a black box, the project helped me understand how an image moves from raw RGB pixels, through increasingly useful learned features, and finally into a classification decision.",
            },

            {
              type: "text",
              content:
                "More broadly, the project showed how machine learning can complement scientific workflows by turning large image collections into scalable prediction problems while still requiring careful thought about how the original scientific information is represented.",
            },
          ],
        },
      ]}
    />
  );
}