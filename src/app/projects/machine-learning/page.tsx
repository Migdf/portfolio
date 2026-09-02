import ProjectPage from "../../components/ProjectPage";

export default function MachineLearningPage() {
  return (
    <ProjectPage
      title="Hopfield Networks & Restricted Boltzmann Machines"
      subtitle="Implementing energy-based machine learning models from scratch in Python to study associative memory, pattern reconstruction, and probabilistic learning."
      image="/images/ml-corrupt.png"

      technologies={[
        "Python",
        "NumPy",
        "Machine Learning",
        "Hopfield Networks",
        "Restricted Boltzmann Machines",
        "Energy-Based Models",
      ]}

      links={[
        {
          label: "View GitHub",
          href: "https://github.com/Migdf/PHYS-446/blob/main/Machine%20Learning/Machine%20Learning.ipynb",
        },
      ]}

      sections={[
        {
          title: "The Problem",
          blocks: [
            {
              type: "text",
              content:
                "Neural networks are often introduced through high-level machine learning libraries that hide much of the underlying mathematics. In this project, I explored how energy-based neural networks work by implementing Hopfield Networks and Restricted Boltzmann Machines directly in Python.",
            },
          ],
        },

        {
          title: "Approach",
          blocks: [
            {
              type: "text",
              content:
                "I built the models from scratch rather than relying on machine learning frameworks such as PyTorch or TensorFlow. This required manually implementing the weight updates, energy calculations, neuron state updates, and training procedures used by each model.",
            },
          ],
        },

        {
          title: "Hopfield Network",
          blocks: [
            {
              type: "text",
              content:
                "The Hopfield Network was used as an associative memory system. I trained the network to store binary image patterns and then tested whether it could reconstruct the original pattern when given corrupted or incomplete inputs. The network repeatedly updates neuron states while moving toward a lower-energy configuration.",
            },
          ],
        },

        {
          title: "Restricted Boltzmann Machine",
          blocks: [
            {
              type: "text",
              content:
                "I also implemented a Restricted Boltzmann Machine, a stochastic energy-based model with visible and hidden units. The RBM learns probability distributions over the training data by adjusting weights based on correlations between visible and hidden units.",
            },
          ],
        },

        {
          title: "Results",

          blocks: [
            {
              type: "text",
              content:
                "The Hopfield Network successfully recovered stored patterns from corrupted inputs, demonstrating its ability to act as an associative memory. The sequence below shows corrupted patterns progressively converging toward the stored representation.",
            },

            {
              type: "image",
              image: {
                src: "/images/ml-corrupt.png",
                alt: "Hopfield network recovering a corrupted face pattern",
                caption:
                  "A corrupted input pattern converges toward the stored face as the Hopfield Network minimizes its energy.",
              },
            },

            {
              type: "image",
              image: {
                src: "/images/ml-random_perturbed.png",
                alt: "Hopfield network recovering a randomly perturbed face pattern",
                caption:
                  "A randomly perturbed input pattern converges toward the stored face as the Hopfield Network minimizes its energy.",
              },
            },

            {
              type: "code",
              code: `# Minimizing energy update function for Hopfield Network
def update_state(state, weights):
    new_state = state.copy()

    for i in range(len(state)):
        activation = np.dot(weights[i], state)

        if activation >= 0:
            new_state[i] = 1
        else:
            new_state[i] = -1

    return new_state`,
            },

            {
              type: "image",
              image: {
                src: "/images/ml-reconstruction_error.png",
                alt: "Restricted Boltzmann Machine results",
                caption: "RBM reconstruction error graph"
              },
            },
          ],
        },

        {
          title: "What I Learned",
          blocks: [
            {
              type: "text",
              content: `Implementing these models from scratch gave me a much stronger understanding of how neural networks operate beneath high-level machine learning libraries. I learned how weights, energy functions, iterative updates, and probabilistic sampling interact to produce learned behavior.

The project also helped me understand the relationship between machine learning and statistical physics, particularly how minimizing an energy function can be used to represent memory and learned probability distributions.`,
            },
          ],
        },
      ]}
    />
  );
}