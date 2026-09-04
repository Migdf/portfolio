import ProjectPage from "../../components/ProjectPage";

export default function MachineLearningPage() {
  return (
    <ProjectPage
      title="Hopfield Networks & Restricted Boltzmann Machines"
      subtitle="Implementing energy-based machine learning models from scratch in Python to study associative memory, energy minimization, probabilistic sampling, and learned distributions."
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
          label: "View Source Code",
          href: "https://github.com/Migdf/PHYS-446/blob/main/Machine%20Learning/Machine%20Learning.ipynb",
        },
      ]}

      sections={[
        {
          title: "Project Overview",
          blocks: [
            {
              type: "text",
              content:
                "Modern machine learning libraries can hide many of the calculations happening underneath a model. This project focuses on two energy-based neural-network models implemented directly with Python and NumPy: a Hopfield Network for associative memory and a Restricted Boltzmann Machine, or RBM, for probabilistic learning.\n\nRather than relying on high-level training functions from PyTorch or TensorFlow, the neuron states, weight matrices, energy functions, probability calculations, sampling steps, and parameter updates were implemented directly. This made it possible to compare the behavior of the code with the mathematical definitions of each model.",
            },
          ],
        },

        {
          title: "Hopfield Network",
          blocks: [
            {
              type: "text",
              content:
                "A Hopfield Network can be thought of as a form of associative memory. Instead of retrieving a stored pattern only when given an exact copy, it can sometimes recover the original from a damaged or incomplete version.\n\nEach image is represented as a one-dimensional vector of neurons whose states are either +1 or -1. If an image contains n pixels, it becomes a vector with n neuron values, such as v = [1, -1, 1, 1, -1, ...]. The memory is stored through the connections between neurons rather than by keeping the original vector directly.",
            },

            {
              type: "text",
              content:
                "To store a single memory, the outer product v vᵀ is used. This creates a square matrix describing the relationship between every pair of neurons. Neurons with the same sign contribute positively, while neurons with opposite signs contribute negatively.\n\nFor multiple memories, these outer-product matrices are combined and averaged.",
            },

            {
              type: "equation",
              equation: String.raw`
                W
                =
                \frac{1}{M}
                \sum_{m=1}^{M}
                \mathbf{v}_m
                \mathbf{v}_m^{T}
              `,
              caption:
                "Weight matrix formed by averaging the relationships contained in all stored memories.",
            },

            {
              type: "text",
              content:
                "Here, W is the network's weight matrix, M is the number of stored memories, and vₘ is the m-th memory. The summation means the outer-product calculation is performed for every stored pattern and the results are added together. Each entry Wᵢⱼ therefore represents the connection strength between neurons i and j. The diagonal entries are set to zero so that neurons do not connect to themselves.",
            },

            {
              type: "text",
              content:
                "Once the memories are stored, the network uses an energy function to determine which neuron configurations are stable.",
            },

            {
              type: "equation",
              equation: String.raw`
                E
                =
                -\frac{1}{2}
                \mathbf{s}^{T}W\mathbf{s}
                +
                \mathbf{b}^{T}\mathbf{s}
              `,
              caption:
                "Energy of the current Hopfield Network configuration.",
            },

            {
              type: "text",
              content:
                "Here, E is the total energy of the current state, s contains the current +1 or -1 neuron values, W is the stored weight matrix, and b contains the neuron biases. The quadratic term sᵀWs measures how well the current pattern agrees with the relationships encoded in W.",
            },

            {
              type: "text",
              content:
                "The network updates one neuron at a time. For neuron i, the combined influence of the other neurons is calculated from their states and connection strengths, then compared with the neuron's bias to decide whether its new state should be +1 or -1. Repeating these asynchronous updates moves the network toward lower-energy configurations until it reaches a stable state.\n\nA useful way to picture this is as an energy landscape of hills and valleys. Stored memories behave like valleys, and a damaged input can begin somewhere on a slope and move downhill toward one of those stable states.",
            },
          ],
        },

        {
          title: "Hopfield Experiments",
          blocks: [
            {
              type: "text",
              content:
                "Associative memory was tested by deliberately damaging patterns that had already been stored. In one experiment, the left quarter of a stored face image was replaced with incorrect values. In another, selected pixels were randomly flipped from +1 to -1 or from -1 to +1. Each damaged pattern was then used as the network's starting state and allowed to evolve until convergence.",
            },

            {
              type: "text",
              content:
                "Recovery was measured using Hamming distance, which counts the number of positions where two vectors differ. For example, if the original pattern is [1, 1, -1, 1] and the recovered pattern is [1, -1, -1, 1], the Hamming distance is 1. A distance of 0 represents perfect recovery, while larger values mean more bits were reconstructed incorrectly.",
            },

            {
              type: "image",
              image: {
                src: "/images/ml-corrupt.png",
                alt: "Hopfield network recovering a corrupted face pattern",
                caption:
                  "A corrupted face pattern moves toward the stored memory as the Hopfield Network converges to a lower-energy state.",
              },
            },

            {
              type: "image",
              image: {
                src: "/images/ml-random_perturbed.png",
                alt: "Hopfield network recovering a randomly perturbed face pattern",
                caption:
                  "Recovery from randomly flipped neuron states demonstrates associative memory beyond one fixed corruption pattern.",
              },
            },

            {
              type: "text",
              content:
                "Memory capacity was also explored by varying both the number of stored patterns and the fraction of corrupted bits. A Hopfield Network cannot store an unlimited number of memories perfectly because every new pattern modifies the same weight matrix, causing the memories to eventually interfere with one another.\n\nAverage Hamming distance after recovery provided a simple measure of performance. Lower values indicate stronger recall, while larger values show how recovery degrades as memory load or corruption increases.",
            },
          ],
        },

        {
          title: "Restricted Boltzmann Machine",
          blocks: [
            {
              type: "text",
              content:
                "The Restricted Boltzmann Machine approaches learning differently. A Hopfield Network tries to settle into one stable memory, while an RBM learns a probability distribution: it learns which patterns should occur frequently and which should be rare.\n\nThe visible units, written as v, represent observable data, while the hidden units, written as h, are internal variables that help the model capture structure in that data. The model is called restricted because visible units connect only to hidden units, with no visible-to-visible or hidden-to-hidden connections.",
            },

            {
              type: "text",
              content:
                "Like the Hopfield Network, the RBM assigns an energy to each possible configuration.",
            },

            {
              type: "equation",
              equation: String.raw`
                E(\mathbf{v},\mathbf{h})
                =
                -\mathbf{v}^{T}W\mathbf{h}
                -\mathbf{a}^{T}\mathbf{v}
                -\mathbf{b}^{T}\mathbf{h}
              `,
              caption:
                "Energy assigned to one visible-hidden configuration.",
            },

            {
              type: "text",
              content:
                "Here, E(v,h) is the energy of one visible-hidden configuration, v is the visible-state vector, h is the hidden-state vector, W contains the connections between the two layers, and a and b contain the visible and hidden biases. The term vᵀWh measures how compatible the two states are according to those connections. Lower-energy configurations are treated as more likely.",
            },

            {
              type: "text",
              content:
                "The RBM converts that energy into probability.",
            },

            {
              type: "equation",
              equation: String.raw`
                p(\mathbf{v},\mathbf{h})
                =
                \frac{
                  e^{-E(\mathbf{v},\mathbf{h})}
                }{
                  Z
                }
              `,
              caption:
                "Probability of a visible-hidden configuration based on its energy.",
            },

            {
              type: "text",
              content:
                "The quantity p(v,h) is the probability of a visible-hidden configuration. Because the energy appears in the negative exponential, lower-energy states receive larger probability values.\n\nZ is the partition function, which adds the probability weight of every possible visible-hidden state and normalizes the result so all probabilities sum to 1.",
            },

            {
              type: "equation",
              equation: String.raw`
                Z
                =
                \sum_{\mathbf{v},\mathbf{h}}
                e^{-E(\mathbf{v},\mathbf{h})}
              `,
              caption:
                "Partition function used to normalize the RBM probability distribution.",
            },

            {
              type: "text",
              content:
                "Because there are no connections between units within the same layer, each hidden unit can be sampled independently once the visible state is known. For hidden unit j, an effective field combines its bias with the influence of all visible units.",
            },

            {
              type: "equation",
              equation: String.raw`
                m_j
                =
                b_j
                +
                \sum_i
                v_i W_{ij}
              `,
              caption:
                "Effective field acting on hidden unit j.",
            },

            {
              type: "equation",
              equation: String.raw`
                P(h_j = +1 \mid \mathbf{v})
                =
                \frac{
                  e^{m_j}
                }{
                  e^{m_j} + e^{-m_j}
                }
              `,
              caption:
                "Probability that hidden unit j is +1 given the visible configuration.",
            },

            {
              type: "text",
              content:
                "The vertical bar means \"given,\" so this expression gives the probability that hidden unit j equals +1 when the visible state v is known. A large positive mⱼ makes +1 more likely, while a large negative value makes -1 more likely. The same idea works in reverse when sampling visible units from hidden units.\n\nAlternating between hidden-unit sampling and visible-unit sampling creates Gibbs sampling. One complete visible → hidden → visible cycle is one Gibbs step.",
            },
          ],
        },

        {
          title: "Training the RBM",
          blocks: [
            {
              type: "text",
              content:
                "The goal of training is to adjust W, a, and b so that the probability distribution produced by the RBM becomes similar to the distribution of the training data. The implementation uses contrastive-divergence-style training, which compares statistics from real data with statistics generated by the model.",
            },

            {
              type: "text",
              content:
                "The positive phase measures relationships between visible and hidden units when the model is shown real training examples. The negative phase measures similar relationships after states are generated through Gibbs sampling. The difference between these two sets of statistics determines how the weights and biases are updated.\n\nConceptually, this makes data-like configurations more likely while reducing the relative probability of configurations the model produces too often.",
            },

            {
              type: "text",
              content:
                "Reconstruction error was tracked during training as well. Starting from an original visible vector v₀, the model samples a hidden state and reconstructs a new visible vector through Gibbs sampling. The reconstruction error is the fraction of visible units that differ between the original and reconstructed states. Lower error indicates that the model is reproducing patterns more similar to its inputs.",
            },
          ],
        },

        {
          title: "RBM Experiments & Validation",
          blocks: [
            {
              type: "text",
              content:
                "A probabilistic algorithm can produce output that looks reasonable even when its underlying probability calculations are wrong, so the Gibbs sampler was first validated on a small RBM where the exact answer could be calculated.\n\nWith five visible spins there are 2⁵ = 32 possible visible states, and with two hidden spins there are 2² = 4 hidden states. Together, that gives 128 possible visible-hidden configurations, which is small enough to enumerate exactly.",
            },

            {
              type: "text",
              content:
                "The validation used 100,000 Gibbs-sampling trials and compared the sampled frequencies with the exact analytical probabilities. The maximum absolute errors were approximately 0.00071 for p(v,h), 0.00147 for p(v), 0.00267 for p(h), 0.00125 for p(v|h), and 0.00277 for p(h|v). Every maximum error remained below 0.003, showing that the sampler closely reproduced the analytical distributions.",
            },

            {
              type: "text",
              content:
                "After validating the sampler, the next experiment tested whether the RBM could learn a known target distribution q(v). The model produces its own distribution p(v), and training attempts to make the two distributions as similar as possible.\n\nThe experiment used 100,000 training examples with five visible units and three hidden units. Training ran for 30 epochs with mini-batches of 64 and one Gibbs step per contrastive-divergence update.",
            },

            {
              type: "text",
              content:
                "Kullback-Leibler divergence, or KL divergence, was used to measure how closely the learned distribution matched the target.",
            },

            {
              type: "equation",
              equation: String.raw`
                D_{\mathrm{KL}}(q \parallel p)
                =
                \sum_{\mathbf{v}}
                q(\mathbf{v})
                \log
                \left(
                  \frac{
                    q(\mathbf{v})
                  }{
                    p(\mathbf{v})
                  }
                \right)
              `,
              caption:
                "KL divergence comparing the target and learned probability distributions.",
            },

            {
              type: "text",
              content:
                "Here, q(v) is the target probability of configuration v and p(v) is the probability assigned by the RBM. The summation evaluates the difference across every possible visible state. A KL divergence of 0 would mean the learned and target distributions match exactly. After training, the toy RBM reached a final KL divergence of approximately 0.118.",
            },

            {
              type: "image",
              image: {
                src: "/images/ml-reconstruction_error.png",
                alt: "Restricted Boltzmann Machine reconstruction error during training",
                caption:
                  "RBM reconstruction error tracked across training epochs.",
              },
            },
          ],
        },

        {
          title: "Challenges & Decisions",
          blocks: [
            {
              type: "text",
              content:
                "The main challenge was translating compact mathematical definitions into algorithms where every sign, index, matrix dimension, and probability had to be correct. For the Hopfield Network, the weight matrix, energy function, and neuron update rule all had to remain consistent; a sign or indexing mistake could prevent the model from converging toward a stored memory.",
            },

            {
              type: "text",
              content:
                "The RBM introduced a different difficulty because it is stochastic, meaning correct code does not produce the exact same sample every time. A single output therefore was not enough to validate the model. Small RBMs where every state could be enumerated provided an exact ground truth, making it possible to compare the distribution of many generated samples against known analytical probabilities.",
            },
          ],
        },

        {
          title: "Results",
          blocks: [
            {
              type: "text",
              content:
                "The Hopfield Network successfully recovered stored patterns from both structured corruption and randomly flipped pixels. The memory-capacity experiments also showed that recovery becomes harder as more memories are stored or as the input becomes more corrupted.\n\nFor the RBM, Gibbs sampling closely reproduced exact probability distributions, with maximum sampling errors below 0.003 across the joint, marginal, and conditional distributions tested. The trained toy RBM also learned a nonuniform target distribution and reached a final KL divergence of approximately 0.118.",
            },

            {
              type: "image",
              image: {
                src: "/images/ml-corrupt.png",
                alt: "Hopfield network recovering a corrupted face pattern",
                caption:
                  "Hopfield associative-memory recovery from a corrupted input.",
              },
            },

            {
              type: "image",
              image: {
                src: "/images/ml-random_perturbed.png",
                alt: "Hopfield network recovering a randomly perturbed face pattern",
                caption:
                  "Hopfield recovery after randomly perturbing the stored pattern.",
              },
            },

            {
              type: "image",
              image: {
                src: "/images/ml-reconstruction_error.png",
                alt: "Restricted Boltzmann Machine reconstruction error",
                caption:
                  "Reconstruction error during RBM training.",
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
                "Implementing both models from scratch made the relationship between machine learning and statistical physics much clearer to me. The Hopfield Network uses an energy landscape as a memory system, where stored patterns behave like low points that damaged inputs can move toward. The RBM uses the same idea differently: instead of moving toward one state, it converts energy into probability and uses sampling to represent an entire distribution of possible states.",
            },

            {
              type: "text",
              content:
                "The project also made concepts that are often hidden inside machine-learning libraries much more concrete, including matrix-based memory storage, energy functions, local minima, conditional probability, Gibbs sampling, partition functions, reconstruction error, KL divergence, and contrastive divergence.\n\nMost importantly, comparing sampled RBM distributions against exact probabilities reinforced the value of validating numerical and machine-learning implementations against an independently calculable ground truth.",
            },
          ],
        },
      ]}
    />
  );
}